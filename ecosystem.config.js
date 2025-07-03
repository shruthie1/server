const generateRandomCron = () => {
  const minute = Math.floor(Math.random() * 60);
  const hour1 = Math.floor(Math.random() * 12);
  const hour2 = (hour1 + 12) % 24;
  return `${minute} ${hour1},${hour2} * * *`;
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
      cron_restart: generateRandomCron(0),
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
      cron_restart: generateRandomCron(1),
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
      cron_restart: generateRandomCron(2),
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
      cron_restart: generateRandomCron(3),
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
      cron_restart: generateRandomCron(4),
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
      cron_restart: generateRandomCron(5),
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
      cron_restart: generateRandomCron(6),
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
      cron_restart: generateRandomCron(7),
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
      cron_restart: generateRandomCron(8),
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
      cron_restart: generateRandomCron(9),
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};

