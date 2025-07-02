const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/8 * * *`;
};
module.exports = {
  apps: [
    {
      name: "arpitha-prom1",
      script: "server.js",
      env: {
        PORT: 3001,
        clientId: "arpitha1",
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
      name: "shruthi-prom1",
      script: "server.js",
      env: {
        PORT: 3003,
        clientId: "shruthi1",
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
      name: "kavya-prom1",
      script: "server.js",
      env: {
        PORT: 3005,
        clientId: "kavya1",
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
      name: "meghana-prom1",
      script: "server.js",
      env: {
        PORT: 3007,
        clientId: "meghana1",
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
      name: "keerthi-prom1",
      script: "server.js",
      env: {
        PORT: 3009,
        clientId: "keerthi1",
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
      name: "divya-prom1",
      script: "server.js",
      env: {
        PORT: 3011,
        clientId: "divya1",
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
      name: "sowmya-prom1",
      script: "server.js",
      env: {
        PORT: 3013,
        clientId: "sowmya1",
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
      name: "sneha-prom1",
      script: "server.js",
      env: {
        PORT: 3015,
        clientId: "sneha1",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "10 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "ramya-prom1",
      script: "server.js",
      env: {
        PORT: 3017,
        clientId: "ramya1",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "20 4 * * *",
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "nidhi-prom1",
      script: "server.js",
      env: {
        PORT: 3019,
        clientId: "nidhi1",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "30 4 * * *",
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};

