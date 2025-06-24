#!/bin/bash

set -euo pipefail

# ========== Config ==========
DOMAIN="${DOMAIN:-paidgirl.site}"
NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
LOG_FILE="${LOG_FILE:-/var/log/app-setup.log}"
EMAIL="dodieajt@gmail.com"  # Email for certbot
ECOSYSTEM_FILE="${ECOSYSTEM_FILE:-./ecosystem.config.js}"

# ========== Colors ==========
NC='\033[0m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; BLUE='\033[1;34m'; CYAN='\033[0;36m'; GRAY='\033[1;30m'

# ========== Template ==========
NGINX_TEMPLATE="
server {
    listen 80;
    server_name {{SERVER_NAME}};

    location / {
        proxy_pass http://localhost:{{PORT}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
}
"

# ========== Logging ==========
timestamp() { date "+%Y-%m-%d %H:%M:%S"; }
log()      { echo -e "${CYAN}[$(timestamp)] ➤ $1${NC}" | tee -a "$LOG_FILE"; }
info()     { echo -e "${YELLOW}[$(timestamp)][INFO]${NC} $1" | tee -a "$LOG_FILE"; }
success()  { echo -e "${GREEN}[$(timestamp)][OK]${NC} $1" | tee -a "$LOG_FILE"; }
warn()     { echo -e "${RED}[$(timestamp)][WARN]${NC} $1" | tee -a "$LOG_FILE"; }
debug()    { echo -e "${GRAY}[$(timestamp)][DEBUG]${NC} $1" | tee -a "$LOG_FILE"; }
step()     { echo -e "\n${BLUE}=== $1 ===${NC}" | tee -a "$LOG_FILE"; }

# ========== Validation ==========
check_dependencies() {
    local missing=()
    for cmd in pm2 nginx jq node certbot; do
        if ! command -v "$cmd" &>/dev/null; then
            missing+=("$cmd")
        fi
    done
    if [ "${#missing[@]}" -ne 0 ]; then
        warn "Missing dependencies: ${missing[*]}"
        exit 1
    fi
}

check_sudo() {
    if ! sudo -v &>/dev/null; then
        warn "This script requires sudo privileges"
        exit 1
    fi
}

check_ecosystem_file() {
    if [ ! -f "$ECOSYSTEM_FILE" ]; then
        warn "Ecosystem file not found: $ECOSYSTEM_FILE"
        exit 1
    fi
}

validate_port() {
    local port=$1
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1024 ] || [ "$port" -gt 65535 ]; then
        return 1
    fi
    # Check if port is in use by non-PM2 processes
    if ss -tuln | grep -q ":$port " && ! pm2 list | grep -q "port.*$port"; then
        return 2
    fi
    return 0
}

validate_server_name() {
    local name=$1
    if ! echo "$name" | grep -qE '^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$'; then
        return 1
    fi
    if [ ${#name} -gt 255 ]; then
        return 2
    fi
    return 0
}

validate_system_resources() {
    local space=$(df -m "$(dirname "$NGINX_SITES_AVAILABLE")" | awk 'NR==2 {print $4}')
    local mem=$(free -m | awk 'NR==2 {print $4}')
    local pm2_count=$(pm2 list | grep -c "online" || echo "0")
    if [ "${space:-0}" -lt 100 ]; then return 1; fi
    if [ "${mem:-0}" -lt 512 ]; then return 2; fi
    if [ "${pm2_count:-0}" -gt 50 ]; then return 3; fi
    return 0
}

check_nginx_conflicts() {
    if ! sudo nginx -t &>/dev/null; then
        warn "Nginx configuration has errors"
        sudo nginx -t 2>&1 | tee -a "$LOG_FILE"
        return 1
    fi
    return 0
}

create_backup() {
    local file="$1"
    if [ -f "$file" ]; then
        sudo cp "$file" "${file}.$(date +%Y%m%d_%H%M%S).bak"
        success "Backup created: $file"
    fi
}

# ========== PM2 Management ==========
get_running_pm2_apps() {
    pm2 jlist 2>/dev/null | jq -r '.[] | select(.pm2_env.status == "online") | .name' 2>/dev/null || echo ""
}

get_ecosystem_apps() {
    if [ -f "$ECOSYSTEM_FILE" ]; then
        node -pe "
            try {
                const config = require('$ECOSYSTEM_FILE');
                JSON.stringify(config.apps || []);
            } catch(e) {
                console.error('Error parsing ecosystem file:', e.message);
                process.exit(1);
            }
        " 2>/dev/null || echo "[]"
    else
        echo "[]"
    fi
}

restart_or_start_app() {
    local name=$1
    local port=$2
    local script_path=$3
    local client_id=$4

    if pm2 list | grep -qw "$name"; then
        info "Restarting existing app: $name"
        PORT=$port CLIENT_ID=$client_id pm2 restart "$name"
        success "Restarted $name"
    else
        info "Starting new app: $name"
        PORT=$port CLIENT_ID=$client_id pm2 start "$script_path" --name "$name" --namespace promotions
        success "Started $name"
    fi
}

# ========== SSL Management ==========
issue_ssl_cert() {
    local domain=$1

    # Check if certificate exists and is valid
    if sudo certbot certificates 2>/dev/null | grep -A 5 "Certificate Name: $domain" | grep -q "VALID"; then
        success "Valid SSL certificate exists for $domain"
        return 0
    fi

    info "Issuing SSL certificate for $domain"
    if sudo certbot --nginx -d "$domain" --agree-tos -m "$EMAIL" --non-interactive --redirect; then
        success "SSL certificate issued for $domain"
        return 0
    else
        warn "Failed to issue SSL certificate for $domain"
        if [ -f /var/log/letsencrypt/letsencrypt.log ]; then
            tail -n 10 /var/log/letsencrypt/letsencrypt.log | tee -a "$LOG_FILE"
        fi
        return 1
    fi
}

# ========== Nginx Configuration ==========
create_nginx_config() {
    local name=$1
    local server_name=$2
    local port=$3
    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    if [ -f "$conf_file" ]; then
        # Check if existing config matches current port
        if grep -q "proxy_pass http://localhost:$port" "$conf_file"; then
            debug "Nginx config for $name already exists and is current"
            return 0
        else
            info "Updating existing Nginx config for $name"
            create_backup "$conf_file"
        fi
    else
        info "Creating new Nginx config for $server_name"
    fi

    # Generate new config
    echo "$NGINX_TEMPLATE" | sed "s/{{SERVER_NAME}}/$server_name/g" | sed "s/{{PORT}}/$port/g" | sudo tee "$conf_file" >/dev/null

    # Enable site
    sudo ln -sf "$conf_file" "$enabled_file"

    success "Created and enabled Nginx config for $server_name"
    return 1  # Indicates nginx reload needed
}

# ========== Cleanup Functions ==========
cleanup_orphaned_configs() {
    step "Cleaning up orphaned Nginx configurations"

    local ecosystem_apps_json=$(get_ecosystem_apps)
    local ecosystem_names=$(echo "$ecosystem_apps_json" | jq -r '.[].name' 2>/dev/null || echo "")

    for conf_file in "$NGINX_SITES_AVAILABLE"/*.conf; do
        [ ! -f "$conf_file" ] && continue

        local conf_name=$(basename "$conf_file" .conf)

        # Skip if this config corresponds to a current ecosystem app
        if echo "$ecosystem_names" | grep -qx "$conf_name"; then
            continue
        fi

        # Check if corresponding PM2 app exists
        if ! pm2 list | grep -qw "$conf_name"; then
            warn "Found orphaned Nginx config: $conf_name"
            read -p "Remove orphaned config for $conf_name? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                sudo rm -f "$conf_file"
                sudo rm -f "$NGINX_SITES_ENABLED/${conf_name}.conf"
                success "Removed orphaned config: $conf_name"
                nginx_reload_needed=1
            fi
        fi
    done
}

# ========== Initialization ==========
initialize() {
    check_dependencies
    check_sudo
    check_ecosystem_file

    validate_system_resources || case $? in
        1) warn "Low disk space (< 100MB available)"; exit 1 ;;
        2) warn "Insufficient memory (< 512MB available)"; exit 1 ;;
        3) warn "Too many PM2 apps running (> 50)"; exit 1 ;;
    esac

    sudo mkdir -p "$(dirname "$LOG_FILE")"
    sudo touch "$LOG_FILE"
    sudo chmod 644 "$LOG_FILE"

    check_nginx_conflicts || exit 1
}

# ========== Main Execution ==========
main() {
    local nginx_reload_needed=0
    declare -A processed_ports processed_domains

    step "Processing Ecosystem Configuration"

    local apps_json=$(get_ecosystem_apps)
    local app_count=$(echo "$apps_json" | jq length)

    info "Found $app_count apps in ecosystem configuration"

    for i in $(seq 0 $((app_count - 1))); do
        local app=$(echo "$apps_json" | jq ".[$i]")
        local name=$(echo "$app" | jq -r ".name // empty")
        local port=$(echo "$app" | jq -r ".env.PORT // empty")
        local script_path=$(echo "$app" | jq -r ".script // empty")
        local client_id=$(echo "$app" | jq -r ".env.clientId // .env.CLIENT_ID // .name // empty")

        # Validate required fields
        if [ -z "$name" ] || [ "$name" = "null" ]; then
            warn "App $i: Missing name, skipping"
            continue
        fi

        if [ -z "$port" ] || [ "$port" = "null" ]; then
            warn "App $name: Missing port, skipping"
            continue
        fi

        if [ -z "$script_path" ] || [ "$script_path" = "null" ]; then
            warn "App $name: Missing script path, skipping"
            continue
        fi

        log "Processing app: $name (port: $port)"

        # Validate port
        validate_port "$port" || case $? in
            1) warn "App $name: Invalid port $port, skipping"; continue ;;
            2) warn "App $name: Port $port in use by another process, skipping"; continue ;;
        esac

        # Check for port conflicts within ecosystem
        if [ -n "${processed_ports[$port]:-}" ]; then
            warn "App $name: Port $port already used by ${processed_ports[$port]}, skipping"
            continue
        fi
        processed_ports[$port]=$name

        # Generate server name
        local server_name="$name.$DOMAIN"
        validate_server_name "$server_name" || case $? in
            1) warn "App $name: Invalid domain name $server_name, skipping"; continue ;;
            2) warn "App $name: Domain name too long $server_name, skipping"; continue ;;
        esac

        # Check for domain conflicts within ecosystem
        if [ -n "${processed_domains[$server_name]:-}" ]; then
            warn "App $name: Domain $server_name already used by ${processed_domains[$server_name]}, skipping"
            continue
        fi
        processed_domains[$server_name]=$name

        # Start/restart PM2 app
        restart_or_start_app "$name" "$port" "$script_path" "$client_id"

        # Create/update Nginx configuration
        if create_nginx_config "$name" "$server_name" "$port"; then
            nginx_reload_needed=1
        fi
    done

    # Reload Nginx if needed
    if [ "$nginx_reload_needed" = 1 ]; then
        step "Reloading Nginx"
        if sudo nginx -t && sudo systemctl reload nginx; then
            success "Nginx reloaded successfully"
        else
            warn "Nginx reload failed"
            sudo nginx -t 2>&1 | tee -a "$LOG_FILE"
            exit 1
        fi
    else
        info "No Nginx reload needed"
    fi

    # Issue SSL certificates
    step "Managing SSL Certificates"
    for domain in "${!processed_domains[@]}"; do
        issue_ssl_cert "$domain" || warn "SSL certificate failed for $domain"
    done

    # Cleanup orphaned configurations
    cleanup_orphaned_configs

    step "✅ Deployment Complete!"

    # Summary
    info "Processed domains:"
    for domain in "${!processed_domains[@]}"; do
        info "  - https://$domain (${processed_domains[$domain]})"
    done
}

# ========== Error Handling ==========
cleanup_on_exit() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        warn "Script failed with exit code $exit_code"
        info "Check the log file: $LOG_FILE"
    fi
    exit $exit_code
}

trap cleanup_on_exit EXIT
trap 'exit 130' INT  # Ctrl+C
trap 'exit 143' TERM # Termination

# ========== Script Entry Point ==========
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    initialize
    main "$@"
fi