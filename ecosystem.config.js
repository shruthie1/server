const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/8 * * *`;
};
module.exports = {
  apps: [
    {
      name: "arpitha-prom2",
      script: "server.js",
      env: {
        PORT: 3001,
        clientId: "arpitha2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(0), //"30 19 * * *", // 1:00 AM IST (UTC 19:30)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "shruthi-prom2",
      script: "server.js",
      env: {
        PORT: 3003,
        clientId: "shruthi2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(1), //"40 19 * * *", // 1:10 AM IST (UTC 19:40)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "kavya-prom2",
      script: "server.js",
      env: {
        PORT: 3005,
        clientId: "kavya2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(2), //"50 19 * * *", // 1:20 AM IST (UTC 19:50)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "meghana-prom2",
      script: "server.js",
      env: {
        PORT: 3007,
        clientId: "meghana2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(3), //"0 20 * * *", // 1:30 AM IST (UTC 20:00)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "keerthi-prom2",
      script: "server.js",
      env: {
        PORT: 3009,
        clientId: "keerthi2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(4), //"10 20 * * *", // 1:40 AM IST (UTC 20:10)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "ramya-prom2",
      script: "server.js",
      env: {
        PORT: 3011,
        clientId: "ramya2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(5), //"20 20 * * *", // 1:50 AM IST (UTC 20:20)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "divya-prom2",
      script: "server.js",
      env: {
        PORT: 3013,
        clientId: "divya2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(6), //"30 20 * * *", // 2:00 AM IST (UTC 20:30)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sowmya-prom2",
      script: "server.js",
      env: {
        PORT: 3015,
        clientId: "sowmya2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(7), //"40 20 * * *", // 2:10 AM IST (UTC 20:40)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sneha-prom2",
      script: "server.js",
      env: {
        PORT: 3017,
        clientId: "sneha2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(8), //"50 20 * * *", // 2:20 AM IST (UTC 20:50)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "nidhi-prom2",
      script: "server.js",
      env: {
        PORT: 3019,
        clientId: "nidhi2",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(9), //"0 21 * * *", // 2:30 AM IST (UTC 21:00)
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};