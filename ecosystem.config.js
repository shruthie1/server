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
      name: "arpitha1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4001,
        clientId: "arpitha1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "shruthi1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4003,
        clientId: "shruthi1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "kavya1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4005,
        clientId: "kavya1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "meghana1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4007,
        clientId: "meghana1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "keerthi1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4009,
        clientId: "keerthi1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "ramya1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4011,
        clientId: "ramya1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "divya1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4013,
        clientId: "divya1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sowmya1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4015,
        clientId: "sowmya1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "sneha1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4017,
        clientId: "sneha1"
      },
      cron_restart: generateRandomCron()
    },
    {
      name: "nidhi1",
      ...commonConfig,
      env: {
        ...commonConfig.env,
        PORT: 4019,
        clientId: "nidhi1"
      },
      cron_restart: generateRandomCron()
    }
  ]
};

