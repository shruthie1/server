#!/bin/bash

# ============================================================================
# Server Setup Script - Refactored Version
#
# This script automates the deployment of Node.js applications using:
# - PM2 for process management
# - Nginx for reverse proxy
# - Let's Encrypt for SSL certificates
#
# Key Features:
# - Smart handling of existing running apps (no unnecessary restarts)
# - Proper port conflict detection and resolution
# - Incremental configuration updates (only update what's needed)
# - Health checks before restarting applications
# - Skip SSL renewal for valid certificates
# - Intelligent nginx symlink management
# - Comprehensive nginx configuration validation
# - Cleanup of orphaned configurations and broken symlinks
# - Enhanced security with input sanitization and safe sudo execution
# - Comprehensive permission and capability validation
#
# Author: Refactored for better maintainability and security
# Version: 2.3 - Enhanced security and sudo handling
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

# SSL Certificate settings
readonly SSL_RENEWAL_THRESHOLD_DAYS=30
readonly SSL_VERIFICATION_TIMEOUT=10

# System resource thresholds
readonly MIN_DISK_SPACE_MB=100
readonly MIN_MEMORY_MB=512
readonly MAX_PM2_APPS=50

# Network settings
readonly NETWORK_TIMEOUT=5

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
declare -r EXIT_SYSTEM_ERROR=4
declare -r EXIT_NETWORK_ERROR=5
declare -r EXIT_SECURITY_ERROR=6

# ========== Global Variables ==========
declare -g nginx_reload_needed=0
declare -gA processed_ports=()
declare -gA processed_domains=()

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
    local exit_code="${1:-$EXIT_SYSTEM_ERROR}"
    local message="${2:-Unknown error occurred}"
    error "$message"
    exit "$exit_code"
}

cleanup_on_exit() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        warn "Script failed with exit code $exit_code"
        info "Check the log file: $LOG_FILE"
        info "Run with DEBUG=1 for more verbose output"
    fi
    exit $exit_code
}

setup_error_handling() {
    trap cleanup_on_exit EXIT
    trap 'exit 130' INT  # Ctrl+C
    trap 'exit 143' TERM # Termination
}

# ========== Utility Functions ==========
is_debug_mode() {
    [[ "${DEBUG:-}" == "1" ]]
}

debug_log() {
    if is_debug_mode; then
        debug "$1"
    fi
}

command_exists() {
    command -v "$1" &>/dev/null
}

is_port_valid() {
    local port="$1"
    [[ "$port" =~ ^[0-9]+$ ]] && [ "$port" -ge 1024 ] && [ "$port" -le 65535 ]
}

is_domain_valid() {
    local domain="$1"
    [[ "$domain" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$ ]] && [ ${#domain} -le 255 ]
}

create_backup() {
    local file="$1"
    if [ -f "$file" ]; then
        # Sanitize the file path
        local safe_file
        safe_file=$(sanitize_path "$file")

        local backup_file="${safe_file}.$(date +%Y%m%d_%H%M%S).bak"

        if ! safe_sudo_execute "Creating backup of $safe_file" cp "$safe_file" "$backup_file"; then
            warn "Failed to create backup of $safe_file"
            return 1
        fi
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

check_permissions() {
    step "Checking Permissions"

    if ! sudo -v &>/dev/null; then
        error_exit "$EXIT_PERMISSION_ERROR" "This script requires sudo privileges"
    fi

    success "Sudo privileges confirmed"
}

# ========== System Validation ==========
validate_system_resources() {
    step "Validating System Resources"

    # Check disk space
    local available_space
    available_space=$(df -m "$(dirname "$NGINX_SITES_AVAILABLE")" | awk 'NR==2 {print $4}')
    if [ "${available_space:-0}" -lt "$MIN_DISK_SPACE_MB" ]; then
        error_exit "$EXIT_SYSTEM_ERROR" "Insufficient disk space: ${available_space}MB available, ${MIN_DISK_SPACE_MB}MB required"
    fi

    # Check memory
    local available_memory
    available_memory=$(free -m | awk 'NR==2 {print $4}')
    if [ "${available_memory:-0}" -lt "$MIN_MEMORY_MB" ]; then
        error_exit "$EXIT_SYSTEM_ERROR" "Insufficient memory: ${available_memory}MB available, ${MIN_MEMORY_MB}MB required"
    fi

    # Check PM2 app count
    local pm2_count
    pm2_count=$(pm2 list | grep -c "online" 2>/dev/null || echo "0")
    if [ "${pm2_count:-0}" -gt "$MAX_PM2_APPS" ]; then
        error_exit "$EXIT_SYSTEM_ERROR" "Too many PM2 apps running: ${pm2_count}, maximum ${MAX_PM2_APPS}"
    fi

    success "System resources validated"
}

validate_nginx_config() {
    step "Validating Nginx Configuration"

    if ! safe_sudo_execute "Testing nginx configuration" nginx -t; then
        warn "Nginx configuration has errors"
        error_exit "$EXIT_CONFIG_ERROR" "Nginx configuration validation failed"
    fi

    success "Nginx configuration is valid"
}

validate_ecosystem_file() {
    step "Validating Ecosystem File"

    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        error_exit "$EXIT_CONFIG_ERROR" "Ecosystem file not found: $ECOSYSTEM_FILE"
    fi

    # Validate PM2 ecosystem file (supports both .json and .js formats)
    if ! node -pe "
        try {
            const config = require(require('path').resolve('$ECOSYSTEM_FILE'));
            if (!config || typeof config !== 'object') {
                throw new Error('Configuration object not found');
            }
            if (!config.apps || !Array.isArray(config.apps)) {
                throw new Error('apps array not found in configuration');
            }
            console.log('valid');
        } catch (err) {
            console.error('Validation error:', err.message);
            process.exit(1);
        }
    " &>/dev/null; then
        error_exit "$EXIT_CONFIG_ERROR" "Invalid PM2 ecosystem file: $ECOSYSTEM_FILE"
    fi

    success "Ecosystem file validated"
}

# ========== Port and Domain Validation ==========
validate_port() {
    local port="$1"
    local app_name="${2:-unknown}"

    if ! is_port_valid "$port"; then
        warn "App $app_name: Invalid port $port (must be 1024-65535)"
        return 1
    fi

    # Check if port is in use by non-PM2 processes
    if ss -tuln 2>/dev/null | grep -q ":$port "; then
        # Port is in use, check if it's by the expected PM2 app
        if pm2 list | grep -qw "$app_name.*online" && \
           pm2 show "$app_name" 2>/dev/null | grep -q "port.*$port\|env.*PORT.*$port"; then
            debug_log "Port $port is correctly used by PM2 app $app_name"
            return 0
        else
            warn "App $app_name: Port $port is in use by another process (not this PM2 app)"
            return 2
        fi
    fi

    return 0
}

check_app_health() {
    local app_name="$1"
    local expected_port="$2"

    # Check if app exists and is online
    if ! pm2 list | grep -qw "$app_name.*online"; then
        debug_log "App $app_name is not running or not online"
        return 1
    fi

    # Check if app is using the expected port
    if ! pm2 show "$app_name" 2>/dev/null | grep -q "port.*$expected_port\|env.*PORT.*$expected_port"; then
        debug_log "App $app_name is not using expected port $expected_port"
        return 2
    fi

    # Optional: Check if the app is responsive on the port
    if command_exists curl; then
        if curl -s --connect-timeout 3 --max-time 5 "http://localhost:$expected_port/health" >/dev/null 2>&1 || \
           curl -s --connect-timeout 3 --max-time 5 "http://localhost:$expected_port" >/dev/null 2>&1; then
            debug_log "App $app_name is responsive on port $expected_port"
            return 0
        else
            debug_log "App $app_name is not responsive on port $expected_port"
            return 3
        fi
    fi

    debug_log "App $app_name appears healthy"
    return 0
}

validate_server_name() {
    local domain="$1"
    local app_name="${2:-unknown}"

    if ! is_domain_valid "$domain"; then
        warn "App $app_name: Invalid domain name $domain"
        return 1
    fi

    return 0
}

# ========== PM2 Management ==========
get_ecosystem_apps() {
    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        echo "[]"
        return
    fi

    node -pe "
        try {
            const config = require(require('path').resolve('$ECOSYSTEM_FILE'));
            JSON.stringify(config.apps || []);
        } catch(e) {
            console.error('Error parsing ecosystem file:', e.message);
            process.exit(1);
        }
    " 2>/dev/null || echo "[]"
}

manage_pm2_app() {
    local name="$1"
    local port="$2"
    local script_path="$3"
    local client_id="$4"
    local namespace="$5"

    debug_log "Managing PM2 app: $name (port: $port, script: $script_path, namespace: $namespace)"

    # Build namespace argument if provided
    local namespace_arg=""
    if [ -n "$namespace" ] && [ "$namespace" != "null" ] && [ "$namespace" != "empty" ]; then
        namespace_arg="--namespace $namespace"
    fi

    # Check if app exists and is healthy
    if pm2 list | grep -qw "$name"; then
        local health_status
        check_app_health "$name" "$port"
        health_status=$?

        case $health_status in
            0)
                success "PM2 app $name is already running and healthy on port $port"
                return 0
                ;;
            1)
                info "PM2 app $name exists but is not online, restarting..."
                ;;
            2)
                info "PM2 app $name is using wrong port, restarting with correct port $port..."
                ;;
            3)
                warn "PM2 app $name is not responsive, restarting..."
                ;;
        esac

        # Restart the app with updated environment
        if ! PORT="$port" CLIENT_ID="$client_id" pm2 restart "$name"; then
            warn "Failed to restart PM2 app: $name"
            return 1
        fi
        success "Restarted PM2 app: $name"
    else
        info "Starting new PM2 app: $name"
        if ! PORT="$port" CLIENT_ID="$client_id" pm2 start "$script_path" --name "$name" $namespace_arg; then
            warn "Failed to start PM2 app: $name"
            return 1
        fi
        success "Started PM2 app: $name"
    fi

    # Verify app is running
    sleep 2
    if ! pm2 list | grep -qw "$name.*online"; then
        warn "PM2 app $name is not running after start/restart"
        return 1
    fi

    return 0
}

# ========== SSL Certificate Management ==========
check_ssl_certificate() {
    local domain="$1"
    local cert_info
    local expiry_date
    local days_until_expiry

    # Sanitize domain input
    if ! is_domain_valid "$domain"; then
        warn "Invalid domain format for SSL check: $domain"
        return 2
    fi

    debug_log "Checking SSL certificate for $domain"

    # Get certificate information with safe execution
    if ! cert_info=$(safe_sudo_execute "Getting certificate info for $domain" certbot certificates 2>/dev/null | grep -A 10 "Certificate Name: $domain" || echo ""); then
        debug_log "Failed to get certificate information for $domain"
        return 1
    fi

    if [ -z "$cert_info" ]; then
        debug_log "No certificate found for $domain"
        return 1
    fi

    # Extract expiry date with improved parsing
    expiry_date=$(echo "$cert_info" | grep -E "(Expiry Date|Expires)" | head -1 | \
        sed -E 's/.*([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}).*/\1/')

    if [ -z "$expiry_date" ]; then
        # Try alternative format
        expiry_date=$(echo "$cert_info" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)
        if [ -n "$expiry_date" ]; then
            expiry_date="$expiry_date 23:59:59"
        fi
    fi

    if [ -z "$expiry_date" ]; then
        warn "Could not parse expiry date for certificate $domain"
        return 2
    fi

    # Calculate days until expiry
    local current_timestamp expiry_timestamp
    current_timestamp=$(date +%s)
    expiry_timestamp=$(date -d "$expiry_date" +%s 2>/dev/null || echo "0")

    if [ "$expiry_timestamp" -eq 0 ]; then
        warn "Invalid expiry date format for certificate $domain: $expiry_date"
        return 2
    fi

    days_until_expiry=$(( (expiry_timestamp - current_timestamp) / 86400 ))

    # Determine certificate status
    if [ "$days_until_expiry" -gt "$SSL_RENEWAL_THRESHOLD_DAYS" ]; then
        success "Valid SSL certificate for $domain (expires in $days_until_expiry days)"
        return 0
    elif [ "$days_until_expiry" -gt 0 ]; then
        warn "SSL certificate for $domain expires soon (in $days_until_expiry days)"
        return 3
    else
        warn "SSL certificate for $domain has expired ($days_until_expiry days ago)"
        return 1
    fi
}

verify_ssl_installation() {
    local domain="$1"

    debug_log "Verifying SSL installation for $domain"

    # Test HTTPS connection with multiple methods
    if command_exists curl; then
        if curl -s --connect-timeout "$SSL_VERIFICATION_TIMEOUT" \
               --max-time "$SSL_VERIFICATION_TIMEOUT" \
               "https://$domain" >/dev/null 2>&1; then
            debug_log "HTTPS connection successful for $domain (curl)"
            return 0
        fi
    elif command_exists wget; then
        if wget --timeout="$SSL_VERIFICATION_TIMEOUT" --tries=1 \
               --spider "https://$domain" >/dev/null 2>&1; then
            debug_log "HTTPS connection successful for $domain (wget)"
            return 0
        fi
    fi

    # Fallback to openssl
    if echo | timeout "$SSL_VERIFICATION_TIMEOUT" \
       openssl s_client -connect "$domain:443" -servername "$domain" >/dev/null 2>&1; then
        debug_log "SSL handshake successful for $domain (openssl)"
        return 0
    fi

    debug_log "SSL verification failed for $domain"
    return 1
}

diagnose_ssl_issues() {
    local domain="$1"

    info "Diagnosing SSL issues for $domain"

    # DNS resolution check
    if command_exists dig; then
        local dns_result
        dns_result=$(dig +short "$domain" 2>/dev/null)
        if [ -z "$dns_result" ]; then
            warn "DNS resolution failed for $domain - check DNS records"
        else
            debug_log "DNS resolves to: $dns_result"
        fi
    elif command_exists nslookup; then
        if ! nslookup "$domain" &>/dev/null; then
            warn "DNS resolution failed for $domain - check DNS records"
        fi
    fi

    # Port accessibility check
    if command_exists nc; then
        for port in 80 443; do
            if ! nc -z -w"$NETWORK_TIMEOUT" "$domain" "$port" 2>/dev/null; then
                warn "Port $port not accessible for $domain"
            fi
        done
    fi

    # Nginx configuration check
    local nginx_config="$NGINX_SITES_AVAILABLE/${domain%.*}.conf"
    if [ -f "$nginx_config" ]; then
        if ! grep -q "server_name.*$domain" "$nginx_config"; then
            warn "Nginx configuration may not include $domain in server_name directive"
        fi
    else
        warn "Nginx configuration not found for $domain"
    fi

    # Firewall check
    if command_exists ufw && ufw status 2>/dev/null | grep -q "Status: active"; then
        for port in 80 443; do
            if ! ufw status | grep -q "${port}/tcp.*ALLOW"; then
                warn "UFW may be blocking port $port"
            fi
        done
    fi
}

issue_ssl_certificate() {
    local domain="$1"
    local cert_status

    info "Checking SSL certificate for $domain"

    check_ssl_certificate "$domain"
    cert_status=$?

    case $cert_status in
        0)
            # Check if certificate is actually working
            if verify_ssl_installation "$domain"; then
                success "SSL certificate for $domain is valid and working - skipping"
                return 0
            else
                info "SSL certificate exists but not working properly, renewing for $domain"
            fi
            ;;
        1|2)
            info "Issuing new SSL certificate for $domain"
            ;;
        3)
            info "Renewing SSL certificate for $domain (expires soon)"
            ;;
    esac

    # Verify prerequisites
    local nginx_config="$NGINX_SITES_AVAILABLE/${domain%.*}.conf"
    local safe_nginx_config
    safe_nginx_config=$(sanitize_path "$nginx_config")

    if [ ! -f "$safe_nginx_config" ]; then
        warn "Nginx configuration not found for $domain, cannot issue SSL certificate"
        return 1
    fi

    if ! safe_sudo_execute "Testing nginx config before SSL" nginx -t; then
        warn "Nginx configuration test failed, cannot issue SSL certificate for $domain"
        return 1
    fi

    # Issue/renew certificate with sanitized domain
    local safe_domain
    safe_domain=$(sanitize_path "$domain")
    local safe_email
    safe_email=$(sanitize_path "$EMAIL")

    if safe_sudo_execute "Issuing SSL certificate for $safe_domain" \
        certbot --nginx -d "$safe_domain" --agree-tos -m "$safe_email" \
        --non-interactive --redirect --force-renewal; then
        success "SSL certificate issued/renewed for $domain"

        # Verify installation
        sleep 2
        if check_ssl_certificate "$domain" &>/dev/null && verify_ssl_installation "$domain"; then
            success "SSL certificate verification passed for $domain"
            return 0
        else
            warn "SSL certificate verification failed for $domain"
            return 1
        fi
    else
        warn "Failed to issue SSL certificate for $domain"

        # Log recent errors
        if [ -f /var/log/letsencrypt/letsencrypt.log ]; then
            warn "Recent certbot errors:"
            tail -n 20 /var/log/letsencrypt/letsencrypt.log | \
                grep -E "(ERROR|CRITICAL|WARNING)" | tail -n 5 | tee -a "$LOG_FILE"
        fi

        diagnose_ssl_issues "$domain"
        return 1
    fi
}

# ========== Nginx Configuration Management ==========
check_nginx_config_current() {
    local name="$1"
    local server_name="$2"
    local port="$3"
    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"

    if [ ! -f "$conf_file" ]; then
        debug_log "Nginx config file does not exist for $name"
        return 1
    fi

    # Check if config has correct port and server name
    if grep -q "proxy_pass http://localhost:$port" "$conf_file" && \
       grep -q "server_name $server_name" "$conf_file"; then
        debug_log "Nginx config content is current for $name"
        return 0
    else
        debug_log "Nginx config content needs updating for $name"
        return 1
    fi
}

check_nginx_link_current() {
    local name="$1"
    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    # Check if symlink exists and points to correct file
    if [ -L "$enabled_file" ]; then
        local link_target
        link_target=$(readlink "$enabled_file")
        if [ "$link_target" = "$conf_file" ] || [ "$link_target" = "$(basename "$conf_file")" ]; then
            debug_log "Nginx symlink is current for $name"
            return 0
        else
            debug_log "Nginx symlink points to wrong target for $name: $link_target"
            return 1
        fi
    elif [ -e "$enabled_file" ]; then
        warn "Nginx enabled file exists but is not a symlink for $name"
        return 2
    else
        debug_log "Nginx symlink does not exist for $name"
        return 1
    fi
}

create_nginx_config() {
    local name="$1"
    local server_name="$2"
    local port="$3"

    # Sanitize inputs
    local safe_name safe_server_name safe_port
    safe_name=$(sanitize_path "$name")
    safe_server_name=$(sanitize_path "$server_name")
    safe_port=$(sanitize_path "$port")

    local conf_file="$NGINX_SITES_AVAILABLE/${safe_name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${safe_name}.conf"
    local config_changed=false
    local link_changed=false

    debug_log "Managing Nginx config for $safe_name ($safe_server_name:$safe_port)"

    # Check if configuration file needs updating
    if ! check_nginx_config_current "$safe_name" "$safe_server_name" "$safe_port"; then
        if [ -f "$conf_file" ]; then
            info "Updating existing Nginx config for $safe_name"
            create_backup "$conf_file"
        else
            info "Creating new Nginx config for $safe_name"
        fi

        # Generate configuration from template
        local config_content
        config_content=$(echo "$NGINX_TEMPLATE" | \
            sed "s/{{SERVER_NAME}}/$safe_server_name/g" | \
            sed "s/{{PORT}}/$safe_port/g")

        if echo "$config_content" | safe_sudo_execute "Writing nginx config for $safe_name" tee "$conf_file" >/dev/null; then
            config_changed=true
            success "Updated Nginx config file for $safe_name"
        else
            error_exit "$EXIT_PERMISSION_ERROR" "Failed to write nginx config for $safe_name"
        fi
    else
        debug_log "Nginx config file is already current for $safe_name"
    fi

    # Check if symlink needs updating
    check_nginx_link_current "$safe_name"
    local link_status=$?

    case $link_status in
        0)
            debug_log "Nginx symlink is already current for $safe_name"
            ;;
        1)
            info "Creating/updating Nginx symlink for $safe_name"
            if safe_sudo_execute "Creating nginx symlink for $safe_name" ln -sf "$conf_file" "$enabled_file"; then
                link_changed=true
                success "Updated Nginx symlink for $safe_name"
            fi
            ;;
        2)
            warn "Removing non-symlink file and creating proper symlink for $safe_name"
            safe_sudo_execute "Removing old nginx file for $safe_name" rm -f "$enabled_file"
            if safe_sudo_execute "Creating nginx symlink for $safe_name" ln -sf "$conf_file" "$enabled_file"; then
                link_changed=true
                success "Fixed Nginx symlink for $safe_name"
            fi
            ;;
    esac

    # Return 1 if nginx reload is needed (config or link changed)
    if [ "$config_changed" = true ] || [ "$link_changed" = true ]; then
        return 1
    else
        return 0
    fi
}

# ========== Configuration Verification ==========
verify_existing_setup() {
    local name="$1"
    local server_name="$2"
    local port="$3"

    local nginx_needed=0
    local ssl_needed=0

    # Check Nginx configuration (file content and symlink)
    if ! check_nginx_config_current "$name" "$server_name" "$port"; then
        nginx_needed=1
        debug_log "Nginx config content needs updating for $name"
    elif ! check_nginx_link_current "$name" &>/dev/null; then
        nginx_needed=1
        debug_log "Nginx symlink needs updating for $name"
    else
        debug_log "Nginx configuration is complete and correct for $name"
    fi

    # Check SSL certificate
    if check_ssl_certificate "$server_name" &>/dev/null; then
        if verify_ssl_installation "$server_name" &>/dev/null; then
            debug_log "SSL certificate for $server_name is valid and working"
        else
            ssl_needed=1
            debug_log "SSL certificate for $server_name exists but not working properly"
        fi
    else
        ssl_needed=1
        debug_log "SSL certificate for $server_name needs to be issued/renewed"
    fi

    echo "$nginx_needed $ssl_needed"
}

# ========== Nginx Validation ==========
validate_nginx_site_configs() {
    step "Validating Nginx Site Configurations"

    local broken_links=()
    local invalid_configs=()
    local config_issues=0

    # Check all enabled sites
    for enabled_file in "$NGINX_SITES_ENABLED"/*.conf; do
        [ ! -e "$enabled_file" ] && continue

        local site_name
        site_name=$(basename "$enabled_file" .conf)

        # Check if it's a valid symlink
        if [ -L "$enabled_file" ]; then
            local target
            target=$(readlink "$enabled_file")

            # Check if target exists (handle both absolute and relative paths)
            if [[ "$target" == /* ]]; then
                # Absolute path
                if [ ! -f "$target" ]; then
                    broken_links+=("$site_name -> $target")
                    ((config_issues++))
                fi
            else
                # Relative path
                local full_target="$NGINX_SITES_AVAILABLE/$target"
                if [ ! -f "$full_target" ]; then
                    broken_links+=("$site_name -> $target")
                    ((config_issues++))
                fi
            fi
        elif [ -f "$enabled_file" ]; then
            warn "Enabled site $site_name is a file, not a symlink (unusual but not necessarily wrong)"
        fi

        # Basic syntax check for the configuration
        if [ -f "$enabled_file" ]; then
            # Create a temporary test configuration to avoid injection
            local temp_test_config="/tmp/nginx_test_$$.conf"
            echo "events{} http { include $enabled_file; }" > "$temp_test_config"

            if ! safe_sudo_execute "Testing nginx config syntax for $site_name" nginx -t -c "$temp_test_config"; then
                invalid_configs+=("$site_name")
                ((config_issues++))
            fi

            rm -f "$temp_test_config"
        fi
    done

    # Report issues
    if [ ${#broken_links[@]} -gt 0 ]; then
        warn "Found broken symlinks:"
        for link in "${broken_links[@]}"; do
            warn "  $link"
        done
    fi

    if [ ${#invalid_configs[@]} -gt 0 ]; then
        warn "Found invalid configurations:"
        for config in "${invalid_configs[@]}"; do
            warn "  $config"
        done
    fi

    if [ $config_issues -eq 0 ]; then
        success "All Nginx site configurations are valid"
    else
        warn "Found $config_issues Nginx configuration issues"
    fi

    return $config_issues
}

# ========== Cleanup Functions ==========
cleanup_orphaned_configs() {
    step "Cleaning up orphaned Nginx configurations"

    local ecosystem_apps_json
    ecosystem_apps_json=$(get_ecosystem_apps)
    local ecosystem_names
    ecosystem_names=$(echo "$ecosystem_apps_json" | jq -r '.[].name' 2>/dev/null || echo "")

    # Clean up both available and enabled configs
    for conf_file in "$NGINX_SITES_AVAILABLE"/*.conf; do
        [ ! -f "$conf_file" ] && continue

        local conf_name
        conf_name=$(basename "$conf_file" .conf)

        # Skip if config corresponds to current ecosystem app
        if echo "$ecosystem_names" | grep -qx "$conf_name"; then
            continue
        fi

        # Check if corresponding PM2 app exists
        if ! pm2 list | grep -qw "$conf_name"; then
            warn "Found orphaned Nginx config: $conf_name"
            if [[ "${AUTO_CLEANUP:-}" == "1" ]]; then
                info "Auto-cleaning orphaned config: $conf_name"
                remove_nginx_config "$conf_name"
            else
                read -p "Remove orphaned config for $conf_name? (y/N): " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    remove_nginx_config "$conf_name"
                fi
            fi
        fi
    done

    # Clean up orphaned symlinks (that don't have corresponding available configs)
    for enabled_file in "$NGINX_SITES_ENABLED"/*.conf; do
        [ ! -e "$enabled_file" ] && continue

        local enabled_name
        enabled_name=$(basename "$enabled_file" .conf)
        local corresponding_available="$NGINX_SITES_AVAILABLE/${enabled_name}.conf"

        if [ ! -f "$corresponding_available" ]; then
            warn "Found orphaned Nginx symlink: $enabled_name"
            if [[ "${AUTO_CLEANUP:-}" == "1" ]]; then
                info "Auto-cleaning orphaned symlink: $enabled_name"
                safe_sudo_execute "Removing orphaned symlink $enabled_name" rm -f "$enabled_file"
                success "Removed orphaned symlink: $enabled_name"
                nginx_reload_needed=1
            else
                read -p "Remove orphaned symlink for $enabled_name? (y/N): " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    safe_sudo_execute "Removing orphaned symlink $enabled_name" rm -f "$enabled_file"
                    success "Removed orphaned symlink: $enabled_name"
                    nginx_reload_needed=1
                fi
            fi
        fi
    done
}

remove_nginx_config() {
    local conf_name="$1"
    local safe_conf_name
    safe_conf_name=$(sanitize_path "$conf_name")

    local conf_file="$NGINX_SITES_AVAILABLE/${safe_conf_name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${safe_conf_name}.conf"

    # Remove both available config and enabled symlink safely
    if safe_sudo_execute "Removing nginx config for $safe_conf_name" rm -f "$conf_file" "$enabled_file"; then
        success "Removed orphaned config and symlink: $safe_conf_name"
        nginx_reload_needed=1
    else
        warn "Failed to remove nginx config for $safe_conf_name"
    fi
}

# ========== Log Management ==========
setup_logging() {
    step "Setting up logging"

    local safe_log_dir
    safe_log_dir=$(sanitize_path "$(dirname "$LOG_FILE")")
    local safe_log_file
    safe_log_file=$(sanitize_path "$LOG_FILE")

    if ! safe_sudo_execute "Creating log directory" mkdir -p "$safe_log_dir"; then
        error_exit "$EXIT_PERMISSION_ERROR" "Failed to create log directory: $safe_log_dir"
    fi

    if ! safe_sudo_execute "Creating log file" touch "$safe_log_file"; then
        error_exit "$EXIT_PERMISSION_ERROR" "Failed to create log file: $safe_log_file"
    fi

    if ! safe_sudo_execute "Setting log file permissions" chmod 644 "$safe_log_file"; then
        warn "Failed to set log file permissions: $safe_log_file"
    fi

    # Rotate log if it's too large (>10MB)
    if [ -f "$safe_log_file" ] && [ "$(stat -c%s "$safe_log_file" 2>/dev/null || echo 0)" -gt 10485760 ]; then
        if safe_sudo_execute "Rotating large log file" mv "$safe_log_file" "${safe_log_file}.old"; then
            safe_sudo_execute "Creating new log file" touch "$safe_log_file"
            safe_sudo_execute "Setting new log file permissions" chmod 644 "$safe_log_file"
            info "Rotated large log file"
        fi
    fi

    success "Logging configured: $safe_log_file"
}

# ========== Application Processing ==========
process_ecosystem_apps() {
    step "Processing Ecosystem Configuration"

    local apps_json
    apps_json=$(get_ecosystem_apps)
    local app_count
    app_count=$(echo "$apps_json" | jq length)

    info "Found $app_count apps in ecosystem configuration"

    if [ "$app_count" -eq 0 ]; then
        warn "No apps found in ecosystem configuration"
        return 0
    fi

    local processed_count=0
    local failed_count=0

    for i in $(seq 0 $((app_count - 1))); do
        if process_single_app "$apps_json" "$i"; then
            ((processed_count++))
        else
            ((failed_count++))
        fi
    done

    info "Apps processed: $processed_count successful, $failed_count failed"

    return $failed_count
}

process_single_app() {
    local apps_json="$1"
    local index="$2"

    local app
    app=$(echo "$apps_json" | jq ".[$index]")

    # Extract app configuration
    local name port script_path client_id namespace
    name=$(echo "$app" | jq -r ".name // empty")
    port=$(echo "$app" | jq -r ".env.PORT // empty")
    script_path=$(echo "$app" | jq -r ".script // empty")
    client_id=$(echo "$app" | jq -r ".env.clientId // .env.CLIENT_ID // .name // empty")
    namespace=$(echo "$app" | jq -r ".namespace // empty")

    # Validate required fields
    if [ -z "$name" ] || [ "$name" = "null" ]; then
        warn "App $index: Missing name, skipping"
        return 1
    fi

    if [ -z "$port" ] || [ "$port" = "null" ]; then
        warn "App $name: Missing port, skipping"
        return 1
    fi

    if [ -z "$script_path" ] || [ "$script_path" = "null" ]; then
        warn "App $name: Missing script path, skipping"
        return 1
    fi

    log "Processing app: $name (port: $port)"

    # Validate port and check for conflicts
    validate_port "$port" "$name"
    local port_status=$?

    case $port_status in
        1)
            warn "App $name: Invalid port $port, skipping"
            return 1
            ;;
        2)
            warn "App $name: Port $port is occupied by another process, skipping"
            return 1
            ;;
        0)
            debug_log "Port $port is available or correctly used by $name"
            ;;
    esac

    # Check for port conflicts with other apps in this batch
    if [ -n "${processed_ports[$port]:-}" ] && [ "${processed_ports[$port]}" != "$name" ]; then
        warn "App $name: Port $port already assigned to ${processed_ports[$port]} in this batch, skipping"
        return 1
    fi
    processed_ports[$port]=$name

    # Generate and validate server name
    local server_name="$name.$DOMAIN"
    if ! validate_server_name "$server_name" "$name"; then
        return 1
    fi

    # Check for domain conflicts
    if [ -n "${processed_domains[$server_name]:-}" ] && [ "${processed_domains[$server_name]}" != "$name" ]; then
        warn "App $name: Domain $server_name already assigned to ${processed_domains[$server_name]} in this batch, skipping"
        return 1
    fi
    processed_domains[$server_name]=$name

    # Process the application (only restart if needed)
    if ! manage_pm2_app "$name" "$port" "$script_path" "$client_id" "$namespace"; then
        return 1
    fi

    # Verify what needs to be updated
    local setup_status
    setup_status=$(verify_existing_setup "$name" "$server_name" "$port")
    local nginx_needed ssl_needed
    read -r nginx_needed ssl_needed <<< "$setup_status"

    # Update Nginx configuration if needed
    if [ "$nginx_needed" = "1" ]; then
        info "Nginx configuration needs updating for $name"
        if create_nginx_config "$name" "$server_name" "$port"; then
            nginx_reload_needed=1
        fi
    else
        success "Nginx configuration for $name is already correct"
    fi

    # SSL will be handled in the SSL processing phase
    if [ "$ssl_needed" = "1" ]; then
        debug_log "SSL certificate for $server_name will be processed later"
    else
        success "SSL certificate for $server_name is already valid"
    fi

    return 0
}

# ========== SSL Processing ==========
process_ssl_certificates() {
    step "Managing SSL Certificates"

    if [ ${#processed_domains[@]} -eq 0 ]; then
        info "No domains to process for SSL certificates"
        return 0
    fi

    local ssl_failed_domains=()
    local ssl_success_count=0

    for domain in "${!processed_domains[@]}"; do
        if issue_ssl_certificate "$domain"; then
            ((ssl_success_count++))
        else
            ssl_failed_domains+=("$domain")
        fi
    done

    # SSL Summary
    info "SSL Summary: $ssl_success_count/${#processed_domains[@]} certificates processed successfully"

    if [ ${#ssl_failed_domains[@]} -gt 0 ]; then
        warn "Failed SSL certificates for: ${ssl_failed_domains[*]}"
        warn "Check DNS records and ensure domains point to this server"
        return 1
    fi

    return 0
}

# ========== Nginx Management ==========
reload_nginx_if_needed() {
    if [ "$nginx_reload_needed" = 1 ]; then
        step "Reloading Nginx"

        # Test configuration before reload
        if ! safe_sudo_execute "Testing nginx config before reload" nginx -t; then
            warn "Nginx configuration test failed before reload"
            return 1
        fi

        # Check if nginx service is available and active
        if ! systemctl is-active --quiet nginx 2>/dev/null; then
            warn "Nginx service is not active, attempting to start"
            if ! safe_sudo_execute "Starting nginx service" systemctl start nginx; then
                error_exit "$EXIT_SYSTEM_ERROR" "Failed to start nginx service"
            fi
        fi

        # Reload nginx configuration
        if safe_sudo_execute "Reloading nginx configuration" systemctl reload nginx; then
            success "Nginx reloaded successfully"
        else
            warn "Nginx reload failed, attempting restart"
            if safe_sudo_execute "Restarting nginx service" systemctl restart nginx; then
                success "Nginx restarted successfully"
            else
                error_exit "$EXIT_SYSTEM_ERROR" "Failed to reload/restart nginx"
            fi
        fi
    else
        info "No Nginx reload needed"
    fi
    return 0
}

# ========== Summary and Reporting ==========
display_deployment_summary() {
    step "✅ Deployment Complete!"

    if [ ${#processed_domains[@]} -eq 0 ]; then
        info "No domains were processed"
        return
    fi

    info "Processed domains:"
    for domain in "${!processed_domains[@]}"; do
        local status="❌"
        if check_ssl_certificate "$domain" &>/dev/null; then
            if verify_ssl_installation "$domain" &>/dev/null; then
                status="✅"
            else
                status="⚠️"
            fi
        fi
        info "  $status https://$domain (${processed_domains[$domain]})"
    done
}

display_certificate_summary() {
    if [ ${#processed_domains[@]} -eq 0 ]; then
        return
    fi

    step "SSL Certificate Summary"
    if command_exists certbot; then
        if safe_sudo_execute "Getting certificate summary" certbot certificates 2>/dev/null | \
            grep -E "(Certificate Name|Domains|Expiry Date)" | \
            while IFS= read -r line; do
                if echo "$line" | grep -q "Certificate Name:"; then
                    echo
                fi
                info "$line"
            done; then
            info "Certificate summary displayed"
        else
            info "No certificates found"
        fi
    else
        warn "Certbot not available for certificate summary"
    fi
}

# ========== Security and Access Validation ==========
validate_sudo_capabilities() {
    step "Validating Sudo Capabilities"

    local required_sudo_commands=(
        "nginx -t"
        "systemctl reload nginx"
        "systemctl status nginx"
        "certbot certificates"
        "mkdir -p /var/log"
        "touch /var/log/test"
        "rm -f /var/log/test"
    )

    local failed_commands=()

    for cmd in "${required_sudo_commands[@]}"; do
        if ! sudo -n $cmd &>/dev/null 2>&1; then
            # Try with password prompt
            if ! timeout 5 sudo $cmd &>/dev/null 2>&1; then
                failed_commands+=("$cmd")
            fi
        fi
    done

    if [ ${#failed_commands[@]} -gt 0 ]; then
        warn "Some sudo commands may require additional permissions:"
        for cmd in "${failed_commands[@]}"; do
            warn "  sudo $cmd"
        done
        warn "Script may fail during execution. Consider running with elevated privileges."
    else
        success "All required sudo capabilities verified"
    fi
}

validate_file_permissions() {
    step "Validating File System Permissions"

    local critical_paths=(
        "$NGINX_SITES_AVAILABLE"
        "$NGINX_SITES_ENABLED"
        "$(dirname "$LOG_FILE")"
    )

    for path in "${critical_paths[@]}"; do
        # Check if path exists and is accessible
        if [ ! -d "$path" ]; then
            if ! sudo mkdir -p "$path" 2>/dev/null; then
                error_exit "$EXIT_PERMISSION_ERROR" "Cannot create required directory: $path"
            fi
        fi

        # Test write permissions
        if ! sudo touch "$path/.test_write" 2>/dev/null; then
            error_exit "$EXIT_PERMISSION_ERROR" "No write permission for: $path"
        else
            sudo rm -f "$path/.test_write" 2>/dev/null
        fi
    done

    success "File system permissions validated"
}

sanitize_path() {
    local path="$1"
    # Remove any dangerous characters and normalize path
    path=$(echo "$path" | tr -d ';|&$`' | sed 's/\.\.\///g')
    echo "$path"
}

safe_sudo_execute() {
    local description="$1"
    shift
    local cmd=("$@")

    debug_log "Executing with sudo: $description"

    # Sanitize command arguments
    local safe_cmd=()
    for arg in "${cmd[@]}"; do
        case "$arg" in
            *';'*|*'|'*|*'&'*|*'$'*|*'`'*)
                error_exit "$EXIT_SECURITY_ERROR" "Unsafe command argument detected: $arg"
                ;;
            *)
                safe_cmd+=("$arg")
                ;;
        esac
    done

    if ! sudo "${safe_cmd[@]}"; then
        error_exit "$EXIT_PERMISSION_ERROR" "Failed to execute: $description"
    fi
}

# ========== Main Functions ==========
initialize() {
    step "Initializing Setup Script"

    setup_error_handling
    setup_logging
    validate_sudo_capabilities
    validate_file_permissions
    check_dependencies
    check_permissions
    validate_ecosystem_file
    validate_system_resources
    validate_nginx_config
    validate_nginx_site_configs

    success "Initialization complete"
}

main() {
    # Process applications
    if ! process_ecosystem_apps; then
        warn "Some applications failed to process"
    fi

    # Reload Nginx if configurations changed
    if ! reload_nginx_if_needed; then
        error_exit "$EXIT_CONFIG_ERROR" "Failed to reload Nginx configuration"
    fi

    # Manage SSL certificates
    if ! process_ssl_certificates; then
        warn "Some SSL certificates failed to process"
    fi

    # Cleanup orphaned configurations
    cleanup_orphaned_configs

    # Final Nginx reload if cleanup made changes
    reload_nginx_if_needed

    # Display results
    display_deployment_summary
    display_certificate_summary

    success "Setup script completed successfully"
}

# ========== Script Entry Point ==========
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    initialize
    main "$@"
fi
