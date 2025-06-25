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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
    }
  ]
};

