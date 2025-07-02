const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/12 * * *`;
};
module.exports = {
  apps: [
    {
      name: "arpitha2",
      script: "server.js",
      env: {
        PORT: 4002,
        clientId: "arpitha2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"30 19 * * *", // 1:00 AM IST (UTC 19:30)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "shruthi2",
      script: "server.js",
      env: {
        PORT: 4004,
        clientId: "shruthi2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"40 19 * * *", // 1:10 AM IST (UTC 19:40)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "kavya2",
      script: "server.js",
      env: {
        PORT: 4006,
        clientId: "kavya2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"50 19 * * *", // 1:20 AM IST (UTC 19:50)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "meghana2",
      script: "server.js",
      env: {
        PORT: 4008,
        clientId: "meghana2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"0 20 * * *", // 1:30 AM IST (UTC 20:00)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "keerthi2",
      script: "server.js",
      env: {
        PORT: 4010,
        clientId: "keerthi2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"10 20 * * *", // 1:40 AM IST (UTC 20:10)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "ramya2",
      script: "server.js",
      env: {
        PORT: 4012,
        clientId: "ramya2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"20 20 * * *", // 1:50 AM IST (UTC 20:20)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "divya2",
      script: "server.js",
      env: {
        PORT: 4014,
        clientId: "divya2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"30 20 * * *", // 2:00 AM IST (UTC 20:30)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sowmya2",
      script: "server.js",
      env: {
        PORT: 4016,
        clientId: "sowmya2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"40 20 * * *", // 2:10 AM IST (UTC 20:40)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sneha2",
      script: "server.js",
      env: {
        PORT: 4018,
        clientId: "sneha2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"50 20 * * *", // 2:20 AM IST (UTC 20:50)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "nidhi2",
      script: "server.js",
      env: {
        PORT: 4020,
        clientId: "nidhi2"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(), //"0 21 * * *", // 2:30 AM IST (UTC 21:00)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};

