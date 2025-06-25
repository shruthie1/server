#!/bin/bash

# ============================================================================
# Simple App Deployment Script - PM2, Nginx & SSL
#
# This script deploys a single Node.js application using:
# - PM2 for process management
# - Nginx for reverse proxy (overwrites existing config)
# - Let's Encrypt for SSL certificates (always renews)
#
# Usage: ./setup.sh <app-name>
#
# Author: Simplified deployment script
# Version: 4.0 - Simple and direct
# ============================================================================

set -euo pipefail

# ========== Configuration ==========
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "${BASH_SOURCE[0]}")"

# Environment variables with defaults
readonly DOMAIN="${DOMAIN:-paidgirl.site}"
readonly NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
readonly NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
readonly LOG_FILE="${LOG_FILE:-/var/log/app-setup.log}"
readonly EMAIL="${EMAIL:-dodieajt@gmail.com}"
readonly ECOSYSTEM_FILE="${ECOSYSTEM_FILE:-./ecosystem.config.js}"

# App-specific variable
readonly TARGET_APP_NAME="${1:-}"

# ========== Color Constants ==========
declare -r NC='\033[0m'
declare -r GREEN='\033[0;32m'
declare -r YELLOW='\033[1;33m'
declare -r RED='\033[0;31m'
declare -r BLUE='\033[1;34m'
declare -r CYAN='\033[0;36m'
declare -r GRAY='\033[1;30m'

# ========== Templates ==========
readonly NGINX_TEMPLATE='server {
    listen 80;
    server_name {{SERVER_NAME}};

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://localhost:{{PORT}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;

        # Additional security
        proxy_hide_header X-Powered-By;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}'

# ========== Exit Codes ==========
declare -r EXIT_SUCCESS=0
declare -r EXIT_DEPENDENCY_ERROR=1
declare -r EXIT_PERMISSION_ERROR=2
declare -r EXIT_CONFIG_ERROR=3

# ========== Global Variables ==========
declare -g nginx_reload_needed=1

# ========== Usage Function ==========
usage() {
    echo "Usage: $SCRIPT_NAME <app-name>"
    echo ""
    echo "Deploy a specific PM2 application from the ecosystem configuration."
    echo ""
    echo "Arguments:"
    echo "  app-name    Name of the application from ecosystem.config.js to deploy"
    echo ""
    echo "Examples:"
    echo "  $SCRIPT_NAME myapp"
    exit 1
}

# ========== Logging Functions ==========
timestamp() {
    date "+%Y-%m-%d %H:%M:%S"
}

_log_message() {
    local level="$1"
    local color="$2"
    local message="$3"
    echo -e "${color}[$(timestamp)][$level]${NC} $message" | tee -a "$LOG_FILE"
}

log() {
    _log_message "LOG" "$CYAN" "➤ $1"
}

info() {
    _log_message "INFO" "$YELLOW" "$1"
}

success() {
    _log_message "OK" "$GREEN" "$1"
}

warn() {
    _log_message "WARN" "$RED" "$1"
}

debug() {
    _log_message "DEBUG" "$GRAY" "$1"
}

error() {
    _log_message "ERROR" "$RED" "$1" >&2
}

step() {
    echo -e "\n${BLUE}=== $1 ===${NC}" | tee -a "$LOG_FILE"
}

# ========== Error Handling ==========
error_exit() {
    local exit_code="${1:-1}"
    local message="${2:-Unknown error occurred}"
    error "$message"
    exit "$exit_code"
}

# ========== Utility Functions ==========
command_exists() {
    command -v "$1" &>/dev/null
}

create_backup() {
    local file="$1"
    if [ -f "$file" ]; then
        local backup_file="${file}.$(date +%Y%m%d_%H%M%S).bak"
        sudo cp "$file" "$backup_file"
        success "Backup created: $backup_file"
    fi
}

# ========== Dependency Management ==========
check_dependencies() {
    step "Checking Dependencies"

    local required_commands=(pm2 nginx jq node certbot)
    local missing_commands=()

    for cmd in "${required_commands[@]}"; do
        if ! command_exists "$cmd"; then
            missing_commands+=("$cmd")
        fi
    done

    if [ "${#missing_commands[@]}" -ne 0 ]; then
        error_exit "$EXIT_DEPENDENCY_ERROR" "Missing required dependencies: ${missing_commands[*]}"
    fi

    success "All dependencies are available"
}

validate_ecosystem_file() {
    step "Validating Ecosystem File"

    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        error_exit "$EXIT_CONFIG_ERROR" "Ecosystem file not found: $ECOSYSTEM_FILE"
    fi

    success "Ecosystem file found"
}

# ========== PM2 Management ==========
get_ecosystem_app_by_name() {
    local target_name="$1"

    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        echo "{}"
        return
    fi

    node -pe "
        try {
            const config = require(require('path').resolve('$ECOSYSTEM_FILE'));
            const apps = config.apps || [];
            const targetApp = apps.find(app => app.name === '$target_name');
            JSON.stringify(targetApp || {});
        } catch(e) {
            console.error('Error parsing ecosystem file:', e.message);
            process.exit(1);
        }
    " 2>/dev/null || echo "{}"
}

list_ecosystem_apps() {
    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        echo "No ecosystem file found: $ECOSYSTEM_FILE"
        return 1
    fi

    echo "Available applications in $ECOSYSTEM_FILE:"
    node -pe "
        try {
            const config = require(require('path').resolve('$ECOSYSTEM_FILE'));
            const apps = config.apps || [];
            apps.forEach((app, index) => {
                const port = app.env?.PORT || 'unknown';
                const script = app.script || 'unknown';
                console.log('  ' + (index + 1) + '. ' + app.name + ' (port: ' + port + ', script: ' + script + ')');
            });
            if (apps.length === 0) {
                console.log('  No applications found');
            }
        } catch(e) {
            console.error('Error parsing ecosystem file:', e.message);
            process.exit(1);
        }
    " 2>/dev/null
}

manage_pm2_app() {
    local name="$1"
    local port="$2"
    local script_path="$3"
    local client_id="$4"
    local namespace="$5"

    info "Managing PM2 app: $name"

    # Build namespace argument if provided
    local namespace_arg=""
    if [ -n "$namespace" ] && [ "$namespace" != "null" ] && [ "$namespace" != "empty" ]; then
        namespace_arg="--namespace $namespace"
    fi

    # Stop existing app if running - improved error handling
    if pm2 list | grep -qw "$name"; then
        info "Stopping existing PM2 app: $name"
        if ! pm2 stop "$name" 2>/dev/null; then
            warn "Failed to stop PM2 app: $name (may not be running)"
        fi
        if ! pm2 delete "$name" 2>/dev/null; then
            warn "Failed to delete PM2 app: $name (may not exist)"
        fi
        sleep 2  # Give PM2 time to clean up
    fi

    # Validate script path exists
    if [ ! -f "$script_path" ]; then
        error "Script file not found: $script_path"
        return 1
    fi

    # Start the app with proper environment variable handling
    info "Starting PM2 app: $name"

    # Create temporary ecosystem config for this specific app to avoid injection
    local temp_config="/tmp/pm2_${name}_$$.json"
    cat > "$temp_config" << EOF
{
  "apps": [{
    "name": "$name",
    "script": "$script_path",
    "env": {
      "PORT": "$port",
      "CLIENT_ID": "$client_id",
      "clientId": "$client_id",
      "serviceName": "1"
    }
  }]
}
EOF

    if pm2 start "$temp_config" $namespace_arg; then
        rm -f "$temp_config"
        success "Started PM2 app: $name"
        return 0
    else
        rm -f "$temp_config"
        error "Failed to start PM2 app: $name"
        return 1
    fi
}

# ========== Deployment Locking ==========
LOCK_FILE="/tmp/deployment_${TARGET_APP_NAME}.lock"

acquire_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_pid=$(cat "$LOCK_FILE" 2>/dev/null)
        if [ -n "$lock_pid" ] && kill -0 "$lock_pid" 2>/dev/null; then
            error_exit 1 "Another deployment is already running for $TARGET_APP_NAME (PID: $lock_pid)"
        else
            info "Removing stale lock file"
            rm -f "$LOCK_FILE"
        fi
    fi

    echo $$ > "$LOCK_FILE"
    success "Deployment lock acquired"
}

release_lock() {
    rm -f "$LOCK_FILE" 2>/dev/null
}

# Ensure lock is released on script exit
trap release_lock EXIT

# ========== Rollback Functions ==========
rollback_deployment() {
    local name="$1"

    warn "Rolling back deployment for $name"

    # Stop the failed application
    if pm2 list | grep -qw "$name"; then
        pm2 stop "$name" 2>/dev/null || true
        pm2 delete "$name" 2>/dev/null || true
    fi

    # Remove nginx config
    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    if [ -f "${conf_file}.bak" ]; then
        sudo mv "${conf_file}.bak" "$conf_file"
        info "Restored nginx config from backup"
    else
        sudo rm -f "$conf_file" "$enabled_file"
        info "Removed nginx config files"
    fi

    # Reload nginx
    sudo nginx -t && sudo systemctl reload nginx

    warn "Rollback completed for $name"
}

# ========== Health Check Function ==========
verify_application_health() {
    local name="$1"
    local port="$2"
    local max_attempts=30
    local attempt=1

    info "Verifying application health for $name on port $port"

    while [ $attempt -le $max_attempts ]; do
        # Check if the port is listening
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            info "Port $port is listening. Testing HTTP response..."
            if curl -s "http://localhost:$port/health" >/dev/null 2>&1 || curl -s "http://localhost:$port" >/dev/null 2>&1; then
                success "Application $name is responding on port $port"
                return 0
            else
                debug "Port $port is listening but not responding to HTTP requests"
            fi
        else
            debug "Port $port is not yet listening"
        fi

        info "Attempt $attempt/$max_attempts: Waiting for application to start..."
        sleep 2
        ((attempt++))
    done

    # Final diagnostic information
    warn "Application $name may not be responding on port $port after ${max_attempts} attempts"
    info "Diagnostic information:"
    info "PM2 status for $name:"
    pm2 show "$name" 2>/dev/null || info "PM2 app $name not found"
    info "Port $port listening status:"
    netstat -tuln 2>/dev/null | grep ":$port " || info "Port $port is not listening"
    
    return 1
}

# ========== SSL Certificate Management ==========
issue_ssl_certificate() {
    local domain="$1"

    info "Issuing SSL certificate for $domain"

    # Validate domain format
    if [[ ! "$domain" =~ ^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$ ]]; then
        error "Invalid domain format: $domain"
        return 1
    fi

    # Check if nginx config exists and is valid before requesting SSL
    # Extract app name from domain (everything before the first dot)
    local app_name="${domain%%.*}"
    local conf_file="$NGINX_SITES_AVAILABLE/${app_name}.conf"
    if [ ! -f "$conf_file" ]; then
        error "Nginx configuration file not found: $conf_file"
        return 1
    fi

    # Test nginx configuration
    if ! sudo nginx -t 2>/dev/null; then
        error "Nginx configuration is invalid. Fix before requesting SSL certificate."
        sudo nginx -t  # Show the actual error
        return 1
    fi

    # Additional debugging - show the actual config file content
    info "Nginx configuration test passed. Config file content:"
    debug "$(sudo cat "$conf_file" | head -10)"

    # Check if certificate already exists and is valid
    if sudo certbot certificates 2>/dev/null | grep -q "$domain"; then
        local cert_expires=$(sudo certbot certificates 2>/dev/null | grep -A 2 "$domain" | grep "Expiry Date" | awk '{print $3}')
        if [ -n "$cert_expires" ]; then
            info "Certificate for $domain expires: $cert_expires"
        fi
        
        # Delete existing certificate to ensure clean renewal
        info "Removing existing certificate for clean renewal"
        sudo certbot delete --cert-name "$domain" --non-interactive 2>/dev/null || true
    fi

    # Request certificate with better error handling
    info "Requesting new SSL certificate for $domain"
    if sudo certbot --nginx -d "$domain" --agree-tos -m "$EMAIL" --non-interactive --redirect 2>/dev/null; then
        success "SSL certificate issued/renewed for $domain"
        return 0
    else
        warn "Failed to issue SSL certificate for $domain. Check domain DNS and nginx configuration."
        # Try without redirect flag
        info "Attempting SSL certificate without redirect"
        if sudo certbot --nginx -d "$domain" --agree-tos -m "$EMAIL" --non-interactive --no-redirect 2>/dev/null; then
            success "SSL certificate issued for $domain (without redirect)"
            return 0
        else
            warn "SSL certificate issuance failed completely. Application will be accessible via HTTP only."
            return 1
        fi
    fi
}

# ========== Nginx Configuration Management ==========
create_nginx_config() {
    local name="$1"
    local server_name="$2"
    local port="$3"

    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    info "Creating Nginx config for $name"

    # Remove existing configs first (as requested by user)
    if [ -f "$conf_file" ]; then
        info "Removing existing nginx config file: $conf_file"
        sudo rm -f "$conf_file"
    fi
    
    if [ -L "$enabled_file" ] || [ -f "$enabled_file" ]; then
        info "Removing existing nginx enabled file: $enabled_file"
        sudo rm -f "$enabled_file"
    fi

    # Generate configuration from template
    local config_content
    config_content=$(echo "$NGINX_TEMPLATE" | \
        sed "s/{{SERVER_NAME}}/$server_name/g" | \
        sed "s/{{PORT}}/$port/g")

    # Write config file
    echo "$config_content" | sudo tee "$conf_file" >/dev/null
    success "Created Nginx config file for $name"

    # Create symlink
    sudo ln -sf "$conf_file" "$enabled_file"
    success "Created Nginx symlink for $name"

    nginx_reload_needed=1
    return 0
}

# ========== Application Processing ==========
process_target_app() {
    step "Processing Target Application: $TARGET_APP_NAME"

    local app_json
    app_json=$(get_ecosystem_app_by_name "$TARGET_APP_NAME")

    # Check if app was found
    if [ "$app_json" = "{}" ] || [ -z "$app_json" ]; then
        error "Application '$TARGET_APP_NAME' not found in ecosystem configuration"
        echo ""
        list_ecosystem_apps
        return 1
    fi

    info "Found application: $TARGET_APP_NAME"

    # Extract app configuration
    local name port script_path client_id namespace
    name=$(echo "$app_json" | jq -r ".name // empty" 2>/dev/null)
    port=$(echo "$app_json" | jq -r ".env.PORT // empty" 2>/dev/null)
    script_path=$(echo "$app_json" | jq -r ".script // empty" 2>/dev/null)
    client_id=$(echo "$app_json" | jq -r ".env.clientId // .env.CLIENT_ID // .name // empty" 2>/dev/null)
    namespace=$(echo "$app_json" | jq -r ".namespace // empty" 2>/dev/null)

    # Use name as fallback for client_id
    if [ -z "$client_id" ] || [ "$client_id" = "null" ]; then
        client_id="$name"
    fi

    # Validate required fields
    if [ -z "$name" ] || [ "$name" = "null" ]; then
        error "Application configuration missing name"
        return 1
    fi

    if [ -z "$port" ] || [ "$port" = "null" ]; then
        error "Application '$name' missing port configuration"
        return 1
    fi

    # Validate port number
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
        error "Invalid port number: $port. Must be between 1-65535"
        return 1
    fi

    # Check if port is already in use
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        warn "Port $port appears to be in use"
    fi

    if [ -z "$script_path" ] || [ "$script_path" = "null" ]; then
        error "Application '$name' missing script path"
        return 1
    fi

    info "Processing app: $name (port: $port, script: $script_path)"

    # Generate server name
    local server_name="$name.$DOMAIN"

    # Process the application
    if ! manage_pm2_app "$name" "$port" "$script_path" "$client_id" "$namespace"; then
        return 1
    fi

    # Create Nginx configuration (always overwrite)
    if ! create_nginx_config "$name" "$server_name" "$port"; then
        return 1
    fi

    # Verify application health
    if ! verify_application_health "$name" "$port"; then
        warn "Application health check failed, but proceeding with deployment"
    fi

    success "Application '$name' processed successfully"
    return 0
}

# ========== SSL Processing ==========
process_ssl_certificates() {
    step "Managing SSL Certificates"

    # Get domain from the processed app
    local server_name="$TARGET_APP_NAME.$DOMAIN"
    info "Processing SSL certificate for: $server_name"

    # Ensure nginx is reloaded with current configuration before SSL
    if ! sudo nginx -t; then
        error "Nginx configuration test failed. Cannot proceed with SSL certificate"
        return 1
    fi
    
    # Reload nginx to ensure current config is active
    if ! sudo systemctl reload nginx; then
        error "Failed to reload nginx before SSL certificate processing"
        return 1
    fi
    
    # Wait a moment for nginx to fully reload
    sleep 2

    if issue_ssl_certificate "$server_name"; then
        success "SSL certificate processed successfully"
        return 0
    else
        warn "SSL certificate processing had issues, but application is still accessible via HTTP"
        return 1
    fi
}

# ========== Nginx Management ==========
# ========== Nginx Management ==========
reload_nginx() {
    step "Reloading Nginx"

    # Test configuration before reload
    if ! sudo nginx -t; then
        error "Nginx configuration test failed"
        return 1
    fi

    # Reload nginx
    if sudo systemctl reload nginx; then
        success "Nginx reloaded successfully"
        return 0
    else
        warn "Nginx reload failed, attempting restart"
        if sudo systemctl restart nginx; then
            success "Nginx restarted successfully"
            return 0
        else
            error "Failed to reload/restart nginx"
            return 1
        fi
    fi
}

# ========== Summary and Reporting ==========
display_deployment_summary() {
    step "✅ Deployment Complete!"

    local domain="$TARGET_APP_NAME.$DOMAIN"
    info "Application deployed successfully:"
    info "  📄 http://$domain ($TARGET_APP_NAME)"
    info "  🔒 https://$domain ($TARGET_APP_NAME)"

    echo ""
    info "Next steps:"
    info "  1. Test the application: curl https://$domain"
    info "  2. Check PM2 status: pm2 status"
    info "  3. View logs: pm2 logs $TARGET_APP_NAME"
}

# ========== Main Functions ==========
validate_input() {
    # Check if app name was provided
    if [ -z "$TARGET_APP_NAME" ]; then
        error "Application name is required"
        echo ""
        usage
    fi

    # Validate app name format (security improvement)
    if [[ ! "$TARGET_APP_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
        error "Invalid application name. Only alphanumeric characters, hyphens, and underscores are allowed."
        exit 1
    fi

    # Check app name length
    if [ ${#TARGET_APP_NAME} -gt 50 ]; then
        error "Application name too long (max 50 characters)"
        exit 1
    fi

    info "Target application: $TARGET_APP_NAME"
}

initialize() {
    step "Initializing Setup Script for: $TARGET_APP_NAME"

    validate_input
    check_dependencies
    validate_ecosystem_file

    success "Initialization complete"
}

main() {
    # Acquire deployment lock
    acquire_lock

    # Process the target application
    if ! process_target_app; then
        rollback_deployment "$TARGET_APP_NAME"
        error_exit "$EXIT_CONFIG_ERROR" "Failed to process application: $TARGET_APP_NAME"
    fi

    # Reload Nginx
    if ! reload_nginx; then
        rollback_deployment "$TARGET_APP_NAME"
        error_exit "$EXIT_CONFIG_ERROR" "Failed to reload Nginx configuration"
    fi

    # Manage SSL certificates
    if ! process_ssl_certificates; then
        warn "SSL certificate processing had issues, but application is still accessible via HTTP"
    fi

    # Display results
    display_deployment_summary

    success "Setup script completed successfully for: $TARGET_APP_NAME"
}

# ========== Script Entry Point ==========
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    # Check for help flag
    if [[ "${1:-}" =~ ^(-h|--help|help)$ ]]; then
        usage
    fi

    # Check for list flag
    if [[ "${1:-}" =~ ^(-l|--list|list)$ ]]; then
        echo "Available applications in ecosystem:"
        list_ecosystem_apps
        exit 0
    fi

    initialize
    main "$@"
fi
