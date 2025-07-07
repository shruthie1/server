// Common configuration for all apps
const commonConfig = {
  script: "server.js",
  autorestart: true,
  max_memory_restart: "300M",
  restart_delay: 5000,
  namespace: "helpers",
  kill_timeout: 5000,
  time: true,
  log_date_format: 'YYYY-MM-DD HH:mm:ss IST',
  merge_logs: true,
  env: {
    TZ: "Asia/Kolkata",
    // NODE_ENV: "production"
  },
  // error_file: "./logs/err.log",
  // out_file: "./logs/out.log",
  // log_file: "./logs/combined.log",
  // max_restarts: 10,
  min_uptime: "10s"
};

module.exports = {
  apps: [
    {
      name: "ums",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 5003,
        clientId: "ums",
        serviceNAme: 'ums'
      },
      cron_restart: "0 4 * * *"
    }
  ]
};

