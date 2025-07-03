const generateRandomCron = () => {
  const minute = Math.floor(Math.random() * 60);
  const hour1 = Math.floor(Math.random() * 12);
  const hour2 = (hour1 + 12) % 24;
  return `${minute} ${hour1},${hour2} * * *`;
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
      cron_restart: generateRandomCron(0),
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
      cron_restart: generateRandomCron(1),
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
      cron_restart: generateRandomCron(2),
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
      cron_restart: generateRandomCron(3),
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
      cron_restart: generateRandomCron(4),
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
      cron_restart: generateRandomCron(5),
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
      cron_restart: generateRandomCron(6),
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
      cron_restart: generateRandomCron(7),
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
      cron_restart: generateRandomCron(8),
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

