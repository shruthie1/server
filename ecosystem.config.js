const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/12 * * *`;
};
module.exports = {
  apps: [
    {
      name: "arpitha1",
      script: "server.js",
      env: {
        PORT: 4001,
        clientId: "arpitha1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(0), //"30 19 * * *", // 1:00 AM IST (UTC 19:30)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "shruthi1",
      script: "server.js",
      env: {
        PORT: 4003,
        clientId: "shruthi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(1), //"40 19 * * *", // 1:10 AM IST (UTC 19:40)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "kavya1",
      script: "server.js",
      env: {
        PORT: 4005,
        clientId: "kavya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(2), //"50 19 * * *", // 1:20 AM IST (UTC 19:50)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "meghana1",
      script: "server.js",
      env: {
        PORT: 4007,
        clientId: "meghana1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(3), //"0 20 * * *", // 1:30 AM IST (UTC 20:00)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "keerthi1",
      script: "server.js",
      env: {
        PORT: 4009,
        clientId: "keerthi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(4), //"10 20 * * *", // 1:40 AM IST (UTC 20:10)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "ramya1",
      script: "server.js",
      env: {
        PORT: 4011,
        clientId: "ramya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(5), //"20 20 * * *", // 1:50 AM IST (UTC 20:20)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "divya1",
      script: "server.js",
      env: {
        PORT: 4013,
        clientId: "divya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(6), //"30 20 * * *", // 2:00 AM IST (UTC 20:30)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sowmya1",
      script: "server.js",
      env: {
        PORT: 4015,
        clientId: "sowmya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(7), //"40 20 * * *", // 2:10 AM IST (UTC 20:40)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "sneha1",
      script: "server.js",
      env: {
        PORT: 4017,
        clientId: "sneha1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(8), //"50 20 * * *", // 2:20 AM IST (UTC 20:50)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
    {
      name: "nidhi1",
      script: "server.js",
      env: {
        PORT: 4019,
        clientId: "nidhi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: generateRandomCron(9), //"0 21 * * *", // 2:30 AM IST (UTC 21:00)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};

