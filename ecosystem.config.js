const generateRandomCron = () => {
  const minute = Math.floor(Math.random() * 60);
  const hour1 = Math.floor(Math.random() * 12);
  const hour2 = (hour1 + 12) % 24;
  return `${minute} ${hour1},${hour2} * * *`;
};

// Common configuration for all apps
const commonConfig = {
  script: "server.js",
  autorestart: true,
  max_memory_restart: "300M",
  restart_delay: 5000,
  namespace: "clients",
  kill_timeout: 5000,
  time: true,
  log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
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
      name: "arpitha2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4002,
        clientId: "arpitha2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "shruthi2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4004,
        clientId: "shruthi2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "kavya2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4006,
        clientId: "kavya2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "meghana2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4008,
        clientId: "meghana2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "keerthi2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4010,
        clientId: "keerthi2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "ramya2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4012,
        clientId: "ramya2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "divya2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4014,
        clientId: "divya2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sowmya2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4016,
        clientId: "sowmya2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sneha2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4018,
        clientId: "sneha2"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "nidhi2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4020,
        clientId: "nidhi2"
      },
      cron_restart: generateRandomCron()
    }
  ]
};

