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
      cron_restart: "5 1 * * *",
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
      cron_restart: "10 1 * * *",
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
      cron_restart: "15 1 * * *",
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
      cron_restart: "20 1 * * *",
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
      cron_restart: "25 1 * * *",
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
      cron_restart: "30 1 * * *",
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
      cron_restart: "35 1 * * *",
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
      cron_restart: "40 1 * * *",
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
      cron_restart: "45 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "50 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "55 1 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "0 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "5 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "10 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "15 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "20 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "25 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "30 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
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
      cron_restart: "35 2 * * *",
      restart_delay: 5000,
      namespace: "clients"
    }
  ]
};

