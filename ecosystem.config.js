const generateRandomCron = () => {
  const minute = Math.floor(Math.random() * 60);
  const startHour = Math.floor(Math.random() * 8);
  const hour2 = (startHour + 8) % 24;
  const hour3 = (startHour + 16) % 24;

  return `${minute} ${startHour},${hour2},${hour3} * * *`;
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
      cron_restart: generateRandomCron(0),
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
      cron_restart: generateRandomCron(1),
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
      cron_restart: generateRandomCron(2),
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
      cron_restart: generateRandomCron(3),
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
      cron_restart: generateRandomCron(4),
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
      cron_restart: generateRandomCron(5),
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
      cron_restart: generateRandomCron(6),
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
      cron_restart: generateRandomCron(7),
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
      cron_restart: generateRandomCron(8),
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
      cron_restart: generateRandomCron(9),
      restart_delay: 5000,
      namespace: "promotions",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};
