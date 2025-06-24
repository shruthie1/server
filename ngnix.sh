#!/bin/bash

set -euo pipefail

# ========== Configuration ==========
SCRIPT_NAME="nginx-config-manager"
VERSION="1.0.0"
NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
NGINX_CONF_DIR="${NGINX_CONF_DIR:-/etc/nginx}"
LOG_FILE="${LOG_FILE:-/var/log/${SCRIPT_NAME}.log}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/nginx}"
DRY_RUN="${DRY_RUN:-false}"
FORCE="${FORCE:-false}"

# ========== Colors ==========
NC='\033[0m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'
BLUE='\033[1;34m'; CYAN='\033[0;36m'; GRAY='\033[1;30m'; PURPLE='\033[0;35m'

# ========== Nginx Templates ==========
HTTP_TEMPLATE='server {
    listen 80;
    server_name {{SERVER_NAME}};

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src '\''self'\'' http: https: data: blob: '\''unsafe-inline'\''" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        proxy_pass http://localhost:{{PORT}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection '\''upgrade'\'';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;

        # Rate limiting (if enabled)
        {{RATE_LIMIT}}
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:{{PORT}};
        proxy_set_header Host $host;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}'

HTTPS_REDIRECT_TEMPLATE='server {
    listen 80;
    server_name {{SERVER_NAME}};
    return 301 https://$server_name$request_uri;
}'

LOAD_BALANCER_TEMPLATE='upstream {{UPSTREAM_NAME}} {
    {{UPSTREAM_SERVERS}}
    keepalive 32;
}

server {
    listen 80;
    server_name {{SERVER_NAME}};

    location / {
        proxy_pass http://{{UPSTREAM_NAME}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection '\''upgrade'\'';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Load balancer specific settings
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_next_upstream_tries 3;
        proxy_next_upstream_timeout 30s;
    }
}'

# ========== Logging Functions ==========
timestamp() { date "+%Y-%m-%d %H:%M:%S"; }
log() { echo -e "${CYAN}[$(timestamp)] ➤ $1${NC}" | tee -a "$LOG_FILE"; }
info() { echo -e "${YELLOW}[$(timestamp)][INFO]${NC} $1" | tee -a "$LOG_FILE"; }
success() { echo -e "${GREEN}[$(timestamp)][OK]${NC} $1" | tee -a "$LOG_FILE"; }
warn() { echo -e "${RED}[$(timestamp)][WARN]${NC} $1" | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}[$(timestamp)][ERROR]${NC} $1" | tee -a "$LOG_FILE"; }
debug() { echo -e "${GRAY}[$(timestamp)][DEBUG]${NC} $1" | tee -a "$LOG_FILE"; }
step() { echo -e "\n${BLUE}=== $1 ===${NC}" | tee -a "$LOG_FILE"; }

# ========== Utility Functions ==========
show_help() {
    cat << EOF
${SCRIPT_NAME} v${VERSION} - Dynamic Nginx Configuration Manager

USAGE:
    $0 [OPTIONS] COMMAND [ARGS...]

COMMANDS:
    create-single <name> <domain> <port>     Create single server config
    create-multi <config-file>               Create multiple configs from JSON/YAML
    create-lb <name> <domain> <ports...>     Create load balancer config
    update <name> [options]                  Update existing config
    remove <name>                            Remove config and disable site
    list                                     List all managed configs
    test                                     Test nginx configuration
    reload                                   Reload nginx safely
    backup                                   Backup all configurations
    restore <backup-name>                    Restore from backup
    cleanup                                  Remove orphaned configs
    validate <config-file>                   Validate config file syntax

OPTIONS:
    --dry-run                               Show what would be done without executing
    --force                                 Force operations without confirmation
    --rate-limit <rate>                     Enable rate limiting (e.g., "10r/m")
    --ssl-redirect                          Add HTTPS redirect for HTTP configs
    --custom-template <file>                Use custom nginx template
    --backup-before                         Create backup before any changes
    --log-file <path>                       Custom log file path
    --help, -h                              Show this help message

EXAMPLES:
    $0 create-single myapp example.com 3000
    $0 create-lb api api.example.com 3001 3002 3003
    $0 create-multi apps.json
    $0 remove myapp --backup-before
    $0 cleanup --dry-run

ENVIRONMENT VARIABLES:
    NGINX_SITES_AVAILABLE    Path to sites-available directory
    NGINX_SITES_ENABLED      Path to sites-enabled directory
    LOG_FILE                 Path to log file
    BACKUP_DIR               Path to backup directory
    DRY_RUN                  Set to 'true' for dry run mode
    FORCE                    Set to 'true' to skip confirmations

EOF
}

check_dependencies() {
    local missing=()
    for cmd in nginx jq; do
        if ! command -v "$cmd" &>/dev/null; then
            missing+=("$cmd")
        fi
    done

    if [ "${#missing[@]}" -ne 0 ]; then
        error "Missing dependencies: ${missing[*]}"
        info "Install with: sudo apt-get install ${missing[*]}"
        exit 1
    fi
}

check_permissions() {
    if [ "$EUID" -ne 0 ] && ! sudo -v &>/dev/null; then
        error "This script requires sudo privileges"
        exit 1
    fi
}

validate_domain() {
    local domain="$1"
    if ! echo "$domain" | grep -qE '^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$' || [ ${#domain} -gt 255 ]; then
        return 1
    fi
    return 0
}

validate_port() {
    local port="$1"
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1 ] || [ "$port" -gt 65535 ]; then
        return 1
    fi
    return 0
}

is_port_available() {
    local port="$1"
    ! ss -tuln | grep -q ":$port "
}

create_directories() {
    sudo mkdir -p "$NGINX_SITES_AVAILABLE" "$NGINX_SITES_ENABLED" "$BACKUP_DIR" "$(dirname "$LOG_FILE")"
    sudo touch "$LOG_FILE"
    sudo chmod 644 "$LOG_FILE"
}

# ========== Backup Functions ==========
create_backup() {
    local backup_name="${1:-$(date +%Y%m%d_%H%M%S)}"
    local backup_path="$BACKUP_DIR/$backup_name"

    step "Creating backup: $backup_name"

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would create backup at: $backup_path"
        return 0
    fi

    sudo mkdir -p "$backup_path"
    sudo cp -r "$NGINX_SITES_AVAILABLE"/* "$backup_path/" 2>/dev/null || true
    sudo tar -czf "$backup_path.tar.gz" -C "$BACKUP_DIR" "$backup_name"
    sudo rm -rf "$backup_path"

    success "Backup created: $backup_path.tar.gz"
}

restore_backup() {
    local backup_name="$1"
    local backup_file="$BACKUP_DIR/$backup_name.tar.gz"

    if [ ! -f "$backup_file" ]; then
        error "Backup file not found: $backup_file"
        return 1
    fi

    step "Restoring backup: $backup_name"

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would restore from: $backup_file"
        return 0
    fi

    # Create current backup before restore
    create_backup "pre-restore-$(date +%Y%m%d_%H%M%S)"

    local temp_dir=$(mktemp -d)
    sudo tar -xzf "$backup_file" -C "$temp_dir"
    sudo cp -r "$temp_dir"/*/* "$NGINX_SITES_AVAILABLE/"
    sudo rm -rf "$temp_dir"

    test_nginx_config && reload_nginx
    success "Backup restored successfully"
}

# ========== Nginx Management Functions ==========
test_nginx_config() {
    step "Testing Nginx configuration"

    if sudo nginx -t 2>/dev/null; then
        success "Nginx configuration is valid"
        return 0
    else
        error "Nginx configuration has errors:"
        sudo nginx -t 2>&1 | tee -a "$LOG_FILE"
        return 1
    fi
}

reload_nginx() {
    step "Reloading Nginx"

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would reload nginx"
        return 0
    fi

    if test_nginx_config; then
        if sudo systemctl reload nginx; then
            success "Nginx reloaded successfully"
            return 0
        else
            error "Failed to reload nginx"
            return 1
        fi
    else
        error "Cannot reload nginx due to configuration errors"
        return 1
    fi
}

enable_site() {
    local name="$1"
    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    if [ ! -f "$conf_file" ]; then
        error "Configuration file not found: $conf_file"
        return 1
    fi

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would enable site: $name"
        return 0
    fi

    sudo ln -sf "$conf_file" "$enabled_file"
    success "Enabled site: $name"
}

disable_site() {
    local name="$1"
    local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would disable site: $name"
        return 0
    fi

    if [ -L "$enabled_file" ]; then
        sudo rm "$enabled_file"
        success "Disabled site: $name"
    else
        warn "Site not enabled: $name"
    fi
}

# ========== Configuration Creation Functions ==========
create_single_config() {
    local name="$1"
    local domain="$2"
    local port="$3"
    local rate_limit="${4:-}"
    local ssl_redirect="${5:-false}"

    # Validation
    if ! validate_domain "$domain"; then
        error "Invalid domain: $domain"
        return 1
    fi

    if ! validate_port "$port"; then
        error "Invalid port: $port"
        return 1
    fi

    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"

    step "Creating configuration for $name ($domain:$port)"

    # Check if port is available (warning only)
    if ! is_port_available "$port"; then
        warn "Port $port appears to be in use"
    fi

    # Backup existing config if it exists
    if [ -f "$conf_file" ]; then
        if [ "$FORCE" != "true" ]; then
            read -p "Configuration exists for $name. Overwrite? (y/N): " -n 1 -r
            echo
            [[ ! $REPLY =~ ^[Yy]$ ]] && return 1
        fi
        sudo cp "$conf_file" "${conf_file}.$(date +%Y%m%d_%H%M%S).bak"
    fi

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would create config: $conf_file"
        info "[DRY RUN] Domain: $domain, Port: $port"
        return 0
    fi

    # Prepare template variables
    local template="$HTTP_TEMPLATE"
    local rate_limit_config=""

    if [ -n "$rate_limit" ]; then
        rate_limit_config="limit_req zone=api burst=20 nodelay;"
    fi

    # Generate configuration
    echo "$template" | \
        sed "s|{{SERVER_NAME}}|$domain|g" | \
        sed "s|{{PORT}}|$port|g" | \
        sed "s|{{RATE_LIMIT}}|$rate_limit_config|g" | \
        sudo tee "$conf_file" >/dev/null

    # Add HTTPS redirect if requested
    if [ "$ssl_redirect" = "true" ]; then
        echo "$HTTPS_REDIRECT_TEMPLATE" | \
            sed "s|{{SERVER_NAME}}|$domain|g" | \
            sudo tee "${conf_file}.redirect" >/dev/null
    fi

    enable_site "$name"
    success "Created configuration for $name"
}

create_load_balancer_config() {
    local name="$1"
    local domain="$2"
    shift 2
    local ports=("$@")

    if [ ${#ports[@]} -lt 2 ]; then
        error "Load balancer requires at least 2 backend servers"
        return 1
    fi

    if ! validate_domain "$domain"; then
        error "Invalid domain: $domain"
        return 1
    fi

    # Validate all ports
    for port in "${ports[@]}"; do
        if ! validate_port "$port"; then
            error "Invalid port: $port"
            return 1
        fi
    done

    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"
    local upstream_name="${name}_upstream"

    step "Creating load balancer configuration for $name"

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would create load balancer config: $conf_file"
        info "[DRY RUN] Domain: $domain, Ports: ${ports[*]}"
        return 0
    fi

    # Generate upstream servers
    local upstream_servers=""
    for port in "${ports[@]}"; do
        upstream_servers+="    server localhost:$port max_fails=3 fail_timeout=30s;\n"
    done

    # Generate configuration
    echo "$LOAD_BALANCER_TEMPLATE" | \
        sed "s|{{UPSTREAM_NAME}}|$upstream_name|g" | \
        sed "s|{{SERVER_NAME}}|$domain|g" | \
        sed "s|{{UPSTREAM_SERVERS}}|$upstream_servers|g" | \
        sudo tee "$conf_file" >/dev/null

    enable_site "$name"
    success "Created load balancer configuration for $name"
}

create_multi_config() {
    local config_file="$1"

    if [ ! -f "$config_file" ]; then
        error "Configuration file not found: $config_file"
        return 1
    fi

    step "Processing multiple configurations from $config_file"

    # Detect file format and parse
    local configs
    if [[ "$config_file" =~ \.json$ ]]; then
        configs=$(jq -c '.configs[]' "$config_file" 2>/dev/null) || {
            error "Invalid JSON format in $config_file"
            return 1
        }
    else
        error "Unsupported file format. Only JSON is supported currently."
        return 1
    fi

    local success_count=0
    local total_count=0

    while IFS= read -r config; do
        ((total_count++))

        local name=$(echo "$config" | jq -r '.name // empty')
        local domain=$(echo "$config" | jq -r '.domain // empty')
        local port=$(echo "$config" | jq -r '.port // empty')
        local type=$(echo "$config" | jq -r '.type // "single"')

        if [ -z "$name" ] || [ -z "$domain" ]; then
            warn "Skipping config $total_count: missing name or domain"
            continue
        fi

        case "$type" in
            "single")
                if [ -z "$port" ]; then
                    warn "Skipping $name: missing port"
                    continue
                fi
                if create_single_config "$name" "$domain" "$port"; then
                    ((success_count++))
                fi
                ;;
            "load_balancer")
                local ports_json=$(echo "$config" | jq -r '.ports[]' 2>/dev/null)
                if [ -z "$ports_json" ]; then
                    warn "Skipping $name: missing ports for load balancer"
                    continue
                fi
                local ports_array=()
                while IFS= read -r port; do
                    ports_array+=("$port")
                done <<< "$ports_json"
                if create_load_balancer_config "$name" "$domain" "${ports_array[@]}"; then
                    ((success_count++))
                fi
                ;;
            *)
                warn "Skipping $name: unsupported type '$type'"
                ;;
        esac
    done <<< "$configs"

    info "Processed $success_count/$total_count configurations successfully"
}

# ========== Management Functions ==========
list_configs() {
    step "Listing Nginx configurations"

    printf "%-20s %-30s %-10s %-10s\n" "NAME" "DOMAIN" "STATUS" "PORT"
    printf "%-20s %-30s %-10s %-10s\n" "----" "------" "------" "----"

    for conf_file in "$NGINX_SITES_AVAILABLE"/*.conf; do
        [ ! -f "$conf_file" ] && continue

        local name=$(basename "$conf_file" .conf)
        local enabled_file="$NGINX_SITES_ENABLED/${name}.conf"
        local status="disabled"

        if [ -L "$enabled_file" ]; then
            status="enabled"
        fi

        # Extract domain and port from config
        local domain=$(sudo grep -m1 "server_name" "$conf_file" | awk '{print $2}' | tr -d ';' 2>/dev/null || echo "unknown")
        local port=$(sudo grep -m1 "proxy_pass.*localhost:" "$conf_file" | sed 's/.*localhost://;s/;.*//' 2>/dev/null || echo "unknown")

        printf "%-20s %-30s %-10s %-10s\n" "$name" "$domain" "$status" "$port"
    done
}

remove_config() {
    local name="$1"
    local backup_before="${2:-false}"

    local conf_file="$NGINX_SITES_AVAILABLE/${name}.conf"

    if [ ! -f "$conf_file" ]; then
        error "Configuration not found: $name"
        return 1
    fi

    step "Removing configuration: $name"

    if [ "$backup_before" = "true" ]; then
        create_backup "before-remove-${name}-$(date +%Y%m%d_%H%M%S)"
    fi

    if [ "$FORCE" != "true" ]; then
        read -p "Really remove configuration for $name? (y/N): " -n 1 -r
        echo
        [[ ! $REPLY =~ ^[Yy]$ ]] && return 1
    fi

    if [ "$DRY_RUN" = "true" ]; then
        info "[DRY RUN] Would remove: $conf_file"
        info "[DRY RUN] Would disable site: $name"
        return 0
    fi

    disable_site "$name"
    sudo rm -f "$conf_file"
    sudo rm -f "${conf_file}.redirect" 2>/dev/null || true

    success "Removed configuration: $name"
}

cleanup_orphaned() {
    step "Cleaning up orphaned configurations"

    local removed_count=0

    for conf_file in "$NGINX_SITES_AVAILABLE"/*.conf; do
        [ ! -f "$conf_file" ] && continue

        local name=$(basename "$conf_file" .conf)
        local port=$(sudo grep -m1 "proxy_pass.*localhost:" "$conf_file" | sed 's/.*localhost://;s/;.*//' 2>/dev/null)

        if [ -n "$port" ] && ! ss -tuln | grep -q ":$port "; then
            warn "Found orphaned config: $name (port $port not in use)"

            if [ "$FORCE" = "true" ] || [ "$DRY_RUN" = "true" ]; then
                if [ "$DRY_RUN" = "true" ]; then
                    info "[DRY RUN] Would remove orphaned config: $name"
                else
                    remove_config "$name" "true"
                fi
                ((removed_count++))
            else
                read -p "Remove orphaned config $name? (y/N): " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    remove_config "$name" "true"
                    ((removed_count++))
                fi
            fi
        fi
    done

    info "Cleaned up $removed_count orphaned configurations"
}

# ========== Main Command Handler ==========
main() {
    local command="${1:-help}"

    case "$command" in
        "create-single")
            [ $# -lt 4 ] && { error "Usage: create-single <name> <domain> <port>"; exit 1; }
            create_single_config "$2" "$3" "$4" "${5:-}" "${6:-false}"
            test_nginx_config && reload_nginx
            ;;
        "create-multi")
            [ $# -lt 2 ] && { error "Usage: create-multi <config-file>"; exit 1; }
            create_multi_config "$2"
            test_nginx_config && reload_nginx
            ;;
        "create-lb")
            [ $# -lt 4 ] && { error "Usage: create-lb <name> <domain> <port1> [port2] ..."; exit 1; }
            local name="$2" domain="$3"
            shift 3
            create_load_balancer_config "$name" "$domain" "$@"
            test_nginx_config && reload_nginx
            ;;
        "remove")
            [ $# -lt 2 ] && { error "Usage: remove <name>"; exit 1; }
            remove_config "$2" "$([[ "$*" =~ --backup-before ]] && echo true || echo false)"
            reload_nginx
            ;;
        "list")
            list_configs
            ;;
        "test")
            test_nginx_config
            ;;
        "reload")
            reload_nginx
            ;;
        "backup")
            create_backup "${2:-}"
            ;;
        "restore")
            [ $# -lt 2 ] && { error "Usage: restore <backup-name>"; exit 1; }
            restore_backup "$2"
            ;;
        "cleanup")
            cleanup_orphaned
            reload_nginx
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# ========== Initialization ==========
initialize() {
    # Parse global options
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN="true"
                shift
                ;;
            --force)
                FORCE="true"
                shift
                ;;
            --log-file)
                LOG_FILE="$2"
                shift 2
                ;;
            --backup-before)
                # This is handled per command
                shift
                ;;
            *)
                break
                ;;
        esac
    done

    check_dependencies
    check_permissions
    create_directories

    info "Starting $SCRIPT_NAME v$VERSION"
    [ "$DRY_RUN" = "true" ] && warn "DRY RUN MODE - No changes will be made"
}

# ========== Error Handling ==========
cleanup_on_exit() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        error "Script failed with exit code $exit_code"
        info "Check the log file: $LOG_FILE"
    fi
    exit $exit_code
}

trap cleanup_on_exit EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

# ========== Script Entry Point ==========
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    initialize "$@"
    main "$@"
fi