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
      cron_restart: "30 19 * * *", // 1:00 AM IST (UTC 19:30)
      restart_delay: 5000,
      namespace: "clients",
      kill_timeout: 5000,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS Z",
      merge_logs: true
    },
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
      name: "shruthi1",
      script: "server.js",
      env: {
        PORT: 4003,
        clientId: "shruthi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "40 19 * * *", // 1:10 AM IST (UTC 19:40)
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
      name: "kavya1",
      script: "server.js",
      env: {
        PORT: 4005,
        clientId: "kavya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "50 19 * * *", // 1:20 AM IST (UTC 19:50)
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
      name: "meghana1",
      script: "server.js",
      env: {
        PORT: 4007,
        clientId: "meghana1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "0 20 * * *", // 1:30 AM IST (UTC 20:00)
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
      name: "keerthi1",
      script: "server.js",
      env: {
        PORT: 4009,
        clientId: "keerthi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "10 20 * * *", // 1:40 AM IST (UTC 20:10)
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
      name: "ramya1",
      script: "server.js",
      env: {
        PORT: 4011,
        clientId: "ramya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "20 20 * * *", // 1:50 AM IST (UTC 20:20)
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
      name: "divya1",
      script: "server.js",
      env: {
        PORT: 4013,
        clientId: "divya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "30 20 * * *", // 2:00 AM IST (UTC 20:30)
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
      name: "sowmya1",
      script: "server.js",
      env: {
        PORT: 4015,
        clientId: "sowmya1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "40 20 * * *", // 2:10 AM IST (UTC 20:40)
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
      name: "sneha1",
      script: "server.js",
      env: {
        PORT: 4017,
        clientId: "sneha1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "50 20 * * *", // 2:20 AM IST (UTC 20:50)
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
      name: "nidhi1",
      script: "server.js",
      env: {
        PORT: 4019,
        clientId: "nidhi1"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "0 21 * * *", // 2:30 AM IST (UTC 21:00)
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

