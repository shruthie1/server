#!/bin/bash

set -euo pipefail

# ========== Config ==========
DOMAIN="${DOMAIN:-paidgirl.site}"
NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
LOG_FILE="${LOG_FILE:-/var/log/app-setup.log}"
EMAIL="dodieajt@gmail.com"  # Email for certbot

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
        proxy_cache_bypass \$http_upgrade;
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

validate_port() {
    local port=$1
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1024 ] || [ "$port" -gt 65535 ]; then return 1; fi
    # Try different commands to check port usage, continue if commands fail
    if command -v lsof >/dev/null 2>&1; then
        if lsof -i ":$port" >/dev/null 2>&1; then return 2; fi
    elif command -v netstat >/dev/null 2>&1; then
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then return 2; fi
    elif command -v ss >/dev/null 2>&1; then
        if ss -tuln 2>/dev/null | grep -q ":$port "; then return 2; fi
    fi
    return 0
}

validate_server_name() {
    local name=$1
    if ! echo "$name" | grep -qE '^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$'; then return 1; fi
    if [ ${#name} -gt 255 ]; then return 2; fi
    if sudo grep -Rq "server_name.*$name" "$NGINX_SITES_AVAILABLE" 2>/dev/null; then return 3; fi
    return 0
}

validate_system_resources() {
    # Check disk space if df is available
    if command -v df >/dev/null 2>&1; then
        local space
        if space=$(df -m "$(dirname "$NGINX_SITES_AVAILABLE")" 2>/dev/null | awk 'NR==2 {print $4}' || echo 0) || \
           space=$(sudo df -m "$(dirname "$NGINX_SITES_AVAILABLE")" 2>/dev/null | awk 'NR==2 {print $4}' || echo 0); then
            if [ "${space:-0}" -lt 100 ]; then return 1; fi
        fi
    fi

    # Check memory if free is available
    if command -v free >/dev/null 2>&1; then
        local mem=$(free -m 2>/dev/null | awk 'NR==2 {print $4}' || echo 0)
        if [ "${mem:-0}" -lt 512 ]; then return 2; fi
    fi

    # Check PM2 processes
    if command -v pm2 >/dev/null 2>&1; then
        local pm2_count=$(pm2 list 2>/dev/null | grep -c "online" || echo 0)
        if [ "${pm2_count:-0}" -gt 50 ]; then return 3; fi
    fi

    return 0
}

check_nginx_conflicts() {
    sudo nginx -t &>/dev/null
}

create_backup() {
    local file="$1"
    [ -f "$file" ] && sudo cp "$file" "${file}.$(date +%Y%m%d_%H%M%S).bak" && success "Backup created: $file"
}

issue_ssl_cert() {
    local domain=$1
    debug "Checking SSL certificate for $domain"

    # First check if certbot is available
    if ! command -v certbot &>/dev/null; then
        warn "Certbot is not installed. Cannot issue SSL certificate for $domain"
        return 1
    fi

    # Check if certificate already exists
    if sudo certbot certificates 2>/dev/null | grep -q "Domains: $domain"; then
        local expiry=$(sudo certbot certificates 2>/dev/null | grep -A2 "Domains: $domain" | grep "Expiry Date:" | awk '{print $(NF-1)" "$NF}')
        success "SSL certificate already exists for $domain (Expires: $expiry)"
        return 0
    fi

    info "Issuing new SSL certificate for $domain"
    local temp_log="/tmp/certbot_${domain//[^a-zA-Z0-9]/_}.log"

    if sudo certbot --nginx -d "$domain" --agree-tos -m "$EMAIL" --non-interactive > "$temp_log" 2>&1; then
        success "SSL certificate successfully issued for $domain"
        debug "$(cat "$temp_log")"
        rm -f "$temp_log"
        return 0
    else
        warn "Failed to issue SSL certificate for $domain"
        warn "Certbot output:"
        cat "$temp_log" | tee -a "$LOG_FILE"
        rm -f "$temp_log"

        if [ -f /var/log/letsencrypt/letsencrypt.log ]; then
            warn "Last 10 lines of Let's Encrypt log:"
            tail -n 10 /var/log/letsencrypt/letsencrypt.log | tee -a "$LOG_FILE"
        fi
        return 1
    fi
}

check_cert_renewal() {
    local domain=$1
    local days_threshold=30

    if ! sudo certbot certificates 2>/dev/null | grep -q "Domains: $domain"; then
        return 0  # No certificate exists, nothing to check
    fi

    local expiry=$(sudo certbot certificates 2>/dev/null | grep -A2 "Domains: $domain" | grep "Expiry Date:" | awk '{print $(NF-1)" "$NF}')
    local expiry_seconds=$(date -d "$expiry" +%s)
    local now_seconds=$(date +%s)
    local days_remaining=$(( (expiry_seconds - now_seconds) / 86400 ))

    if [ "$days_remaining" -lt "$days_threshold" ]; then
        info "Certificate for $domain expires in $days_remaining days. Attempting renewal..."
        if sudo certbot renew --cert-name "$domain" --quiet; then
            success "Certificate renewed for $domain"
        else
            warn "Failed to renew certificate for $domain"
            return 1
        fi
    fi
    return 0
}

# ========== Init ==========
declare -A used_ports used_server_names
debug "Initialized arrays: used_ports and used_server_names"

check_dependencies
check_sudo
validate_system_resources || case $? in
    1) warn "Low disk space"; exit 1 ;;
    2) warn "Insufficient memory"; exit 1 ;;
    3) warn "Too many PM2 apps running"; exit 1 ;;
esac

if ! sudo mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null; then
    warn "Failed to create log directory, using current directory"
    LOG_FILE="./app-setup.log"
fi
sudo touch "$LOG_FILE" 2>/dev/null || touch "$LOG_FILE" || true
sudo chmod 644 "$LOG_FILE" 2>/dev/null || chmod 644 "$LOG_FILE" 2>/dev/null || true

# ========== Main ==========
step "Parsing PM2 Config and Starting Apps"
apps=$(node -p "JSON.stringify(require('./ecosystem.config.js').apps)")

for i in $(seq 0 $(($(echo "$apps" | jq length) - 1))); do
    app=$(echo "$apps" | jq ".[$i]")
    name=$(echo "$app" | jq -r ".name")
    port=$(echo "$app" | jq -r ".env.PORT")
    script_path=$(echo "$app" | jq -r ".script")

    debug "App JSON: $app"

    if [ "$name" = "null" ] || [ "$port" = "null" ] || [ "$script_path" = "null" ]; then
        warn "App missing required fields (name/port/script), skipping"
        continue
    fi

    log "Processing App: $name on Port $port"

    validate_port "$port" || case $? in
        1) warn "Invalid port: $port"; continue ;;
        2) warn "Port already in use: $port"; continue ;;
    esac
    [ -n "${used_ports[$port]:-}" ] && warn "Duplicate port $port used by ${used_ports[$port]}" && continue
    used_ports[$port]=$name

    SERVER_NAME="$name.$DOMAIN"
    validate_server_name "$SERVER_NAME" || case $? in
        1) warn "Invalid domain name: $SERVER_NAME"; continue ;;
        2) warn "Domain too long: $SERVER_NAME"; continue ;;
        3) warn "Domain $SERVER_NAME already used in NGINX"; continue ;;
    esac
    [ -n "${used_server_names[$SERVER_NAME]:-}" ] && warn "Duplicate domain: $SERVER_NAME" && continue
    used_server_names[$SERVER_NAME]=$name

    if ! pm2 list | grep -qw "$name"; then
        info "Starting $name via PM2"
        PORT=$port CLIENT_ID=$name pm2 start "$script_path" --name "$name" --namespace clients
        success "Started $name"
    else
        debug "$name already running in PM2"
    fi

    CONF_FILE="$NGINX_SITES_AVAILABLE/${name}.conf"
    debug "NGINX config file path: $CONF_FILE"
    if [ ! -f "$CONF_FILE" ]; then
        info "Generating NGINX config for $SERVER_NAME"

        debug "Creating NGINX sites directory: $(dirname "$CONF_FILE")"
        if ! sudo mkdir -p "$(dirname "$CONF_FILE")" 2>/dev/null; then
            warn "Failed to create NGINX sites directory. Error: $?"
            debug "Current directory permissions: $(sudo ls -ld "$(dirname "$CONF_FILE")" 2>/dev/null || echo 'Not accessible')"
            continue
        fi

        debug "Attempting to create backup of existing config"
        create_backup "$CONF_FILE" || debug "No existing config to backup"

        debug "Writing NGINX configuration template"
        if ! echo "$NGINX_TEMPLATE" | sed "s/{{SERVER_NAME}}/$SERVER_NAME/g" | sed "s/{{PORT}}/$port/g" | sudo tee "$CONF_FILE" >/dev/null 2>&1; then
            warn "Failed to create NGINX config file. Error: $?"
            debug "Current file permissions: $(sudo ls -l "$CONF_FILE" 2>/dev/null || echo 'File not created')"
            continue
        fi
        debug "NGINX config file created successfully"

        debug "Creating NGINX enabled sites directory"
        if ! sudo mkdir -p "$(dirname "$NGINX_SITES_ENABLED/${name}.conf")" 2>/dev/null; then
            warn "Failed to create NGINX enabled sites directory. Error: $?"
            debug "Directory structure: $(sudo ls -R "$NGINX_SITES_ENABLED" 2>/dev/null || echo 'Directory not accessible')"
            continue
        fi

        debug "Creating symlink for NGINX config"
        if ! sudo ln -sf "$CONF_FILE" "$NGINX_SITES_ENABLED/${name}.conf" 2>/dev/null; then
            warn "Failed to create symlink for NGINX config. Error: $?"
            debug "Symlink target exists: $(test -e "$NGINX_SITES_ENABLED/${name}.conf" && echo 'Yes' || echo 'No')"
            continue
        fi
        debug "Symlink created successfully"

        nginx_reload_needed=1
        success "Created and linked config for $SERVER_NAME"
    else
        debug "NGINX config for $name already exists"
    fi
done

# ========== NGINX Reload ==========
if [ "${nginx_reload_needed:-0}" = 1 ]; then
    step "Reloading NGINX"
    debug "Testing NGINX configuration"
    if ! sudo nginx -t 2>/tmp/nginx_test.log; then
        warn "NGINX configuration test failed"
        debug "NGINX test output: $(cat /tmp/nginx_test.log)"
        debug "NGINX config directory structure: $(ls -R "$NGINX_SITES_ENABLED" 2>/dev/null || echo 'Not accessible')"
        exit 1
    fi

    debug "Attempting to reload NGINX service"
    if ! sudo systemctl reload nginx 2>/tmp/nginx_reload.log; then
        warn "NGINX reload failed"
        debug "NGINX reload output: $(cat /tmp/nginx_reload.log)"
        debug "NGINX service status: $(sudo systemctl status nginx 2>&1 || echo 'Status not available')"
        exit 1
    fi
    success "NGINX reloaded"
else
    info "No NGINX reload needed"
fi

# ========== SSL Automation ==========
step "Processing SSL Certificates"
if [ ${#used_server_names[@]} -eq 0 ]; then
    info "No domains to process for SSL certificates"
    exit 0
fi

debug "Found ${#used_server_names[@]} domains to process"

ssl_success=0
ssl_skipped=0
ssl_failed=0

for domain in "${!used_server_names[@]}"; do
    app_name="${used_server_names[$domain]}"
    debug "Processing SSL for app: $app_name ($domain)"

    # First try to issue/check the certificate
    if issue_ssl_cert "$domain"; then
        # Then check if it needs renewal
        if check_cert_renewal "$domain"; then
            ((ssl_success++))
        else
            ((ssl_failed++))
            warn "Certificate renewal failed for $domain"
        fi
    else
        ((ssl_failed++))
        warn "Moving to next domain..."
    fi
done

info "SSL Certificate Summary:"
if [ $ssl_success -gt 0 ]; then
    info "✓ Successfully processed: $ssl_success"
else
    warn "No certificates were successfully processed"
fi
if [ $ssl_failed -gt 0 ]; then
    warn "✗ Failed: $ssl_failed"
fi
if [ $ssl_success -eq 0 ] && [ $ssl_failed -eq 0 ]; then
    info "No SSL certificates were processed"
fi

# ========== Cleanup ==========
cleanup() {
    local code=$?
    if [ $code -ne 0 ]; then warn "Script failed with exit code $code"; fi
    exit $code
}
trap cleanup EXIT
trap 'exit 1' INT TERM

step "✅ Setup Complete!"
