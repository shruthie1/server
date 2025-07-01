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
      cron_restart: "35 19 * * *", // 1:05 AM IST (UTC 19:35)
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
      cron_restart: "45 19 * * *", // 1:15 AM IST (UTC 19:45)
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
      cron_restart: "55 19 * * *", // 1:25 AM IST (UTC 19:55)
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
      cron_restart: "5 20 * * *", // 1:35 AM IST (UTC 20:05)
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
      cron_restart: "15 20 * * *", // 1:45 AM IST (UTC 20:15)
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
      cron_restart: "25 20 * * *", // 1:55 AM IST (UTC 20:25)
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
      cron_restart: "35 20 * * *", // 2:05 AM IST (UTC 20:35)
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
      cron_restart: "45 20 * * *", // 2:15 AM IST (UTC 20:45)
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
      cron_restart: "55 20 * * *", // 2:25 AM IST (UTC 20:55)
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
      cron_restart: "5 21 * * *", // 2:35 AM IST (UTC 21:05)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    }
  ]
};

