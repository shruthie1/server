const generateRandomCron = () => {
  const minute = Math.floor(Math.random() * 60);
  const startHour = Math.floor(Math.random() * 8);
  const hour2 = (startHour + 8) % 24;
  const hour3 = (startHour + 16) % 24;

  return `${minute} ${startHour},${hour2},${hour3} * * *`;
};

// Common configuration for all apps
const commonConfig = {
  script: "server.js",
  autorestart: true,
  max_memory_restart: "450M",
  restart_delay: 5000,
  namespace: "promotions",
  kill_timeout: 5000,
  time: true,
  log_date_format: "DD/MM/YYYY HH:mm:ss",
  merge_logs: true,
  env: {
    TZ: "Asia/Kolkata",
  },
  min_uptime: "20s"
};

module.exports = {
  apps: [
    {
      name: "arpitha-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3001,
        clientId: "arpitha2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "shruthi-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3003,
        clientId: "shruthi2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "kavya-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3005,
        clientId: "kavya2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "meghana-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3007,
        clientId: "meghana2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "keerthi-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3009,
        clientId: "keerthi2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "divya-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3011,
        clientId: "divya2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sowmya-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3013,
        clientId: "sowmya2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sneha-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3015,
        clientId: "sneha2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "ramya-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3017,
        clientId: "ramya2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "nidhi-prom2",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3019,
        clientId: "nidhi2",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    }
  ]
};
