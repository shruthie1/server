#!/bin/bash

set -e

# ========== Config ==========
DOMAIN="paidgirl.site"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"

# ========== Colors ==========
NC='\033[0m'        # No Color
GREEN='\033[0;32m'  # Success
YELLOW='\033[1;33m' # Info
RED='\033[0;31m'    # Error
BLUE='\033[1;34m'   # Heading
CYAN='\033[0;36m'   # Subtle log

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

# ========== Helper Logs ==========
log()    { echo -e "${CYAN}➤ $1${NC}"; }
info()   { echo -e "${YELLOW}[INFO]${NC} $1"; }
success(){ echo -e "${GREEN}[OK]${NC} $1"; }
warn()   { echo -e "${RED}[WARN]${NC} $1"; }
step()   { echo -e "\n${BLUE}=== $1 ===${NC}"; }

# ========== Start Setup ==========
step "Parsing PM2 Config and Starting Apps"

apps=$(node -p "require('./ecosystem.config.js').apps")

for i in $(seq 0 $(($(echo "$apps" | jq length) - 1))); do
  app=$(echo "$apps" | jq ".[$i]")
  name=$(echo "$app" | jq -r ".name")
  port=$(echo "$app" | jq -r ".env.PORT")

  log "Processing App: ${name} on Port ${port}"

  if ! pm2 list | grep -qw "$name"; then
    info "App '${name}' not running. Starting..."
    PORT=$port CLIENT_ID=$name pm2 start server.js --name "$name" --namespace clients
    success "PM2 App '$name' started."
  else
    success "PM2 App '$name' already running."
  fi

  # ========== NGINX Config ==========
  SERVER_NAME="${name}.${DOMAIN}"
  CONF_FILE="${NGINX_SITES_AVAILABLE}/${name}.conf"

  if [ ! -f "$CONF_FILE" ]; then
    info "Creating NGINX config for $SERVER_NAME"
    echo "${NGINX_TEMPLATE}" | \
      sed "s/{{SERVER_NAME}}/${SERVER_NAME}/g" | \
      sed "s/{{PORT}}/${port}/g" | \
      sudo tee "$CONF_FILE" > /dev/null

    sudo ln -sf "$CONF_FILE" "$NGINX_SITES_ENABLED/$name.conf"
    nginx_reload_needed=1
    success "NGINX config for '${name}' created and linked."
  else
    success "NGINX config for '${name}' already exists."
  fi
done

# ========== NGINX Reload ==========
if [ "$nginx_reload_needed" = 1 ]; then
  step "Reloading NGINX"
  sudo nginx -t && sudo systemctl reload nginx
  success "NGINX reloaded successfully."
else
  info "NGINX reload not needed."
fi

step "✅ Setup Complete!"
