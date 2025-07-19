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
  min_uptime: "10s"
};

module.exports = {
  apps: [
    {
      name: "arpitha-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3001,
        clientId: "arpitha1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "shruthi-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3003,
        clientId: "shruthi1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "kavya-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3005,
        clientId: "kavya1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "meghana-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3007,
        clientId: "meghana1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "keerthi-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3009,
        clientId: "keerthi1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "divya-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3011,
        clientId: "divya1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sowmya-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3013,
        clientId: "sowmya1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sneha-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3015,
        clientId: "sneha1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "ramya-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3017,
        clientId: "ramya1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "nidhi-prom1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 3019,
        clientId: "nidhi1",
        serviceName: "promotion-clients-prom-5"
      },
      cron_restart: generateRandomCron()
    }
  ]
};
