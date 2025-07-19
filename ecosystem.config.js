// Common configuration for all apps
const commonConfig = {
  script: "server.js",
  autorestart: true,
  max_memory_restart: "300M",
  restart_delay: 5000,
  namespace: "helpers",
  kill_timeout: 5000,
  time: true,
  log_type: "json",
  log_date_format: "DD/MM/YYYY HH:mm:ss",
  merge_logs: true,
  env: {
    TZ: "Asia/Kolkata",
  },
  min_uptime: "10s"
};

module.exports = {
  apps: [
    {
      name: "cms",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 5001,
        clientId: "cms-nst"
      },
      cron_restart: "0 2 * * *"
    }
  ]
};

