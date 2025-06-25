module.exports = {
  apps: [
    {
      name: "arpitha-prom1",
      script: "server.js",
      env: {
        PORT: 3001,
        clientId: "arpitha1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "arpitha-prom2",
      script: "server.js",
      env: {
        PORT: 3002,
        clientId: "arpitha2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "shruthi-prom1",
      script: "server.js",
      env: {
        PORT: 3003,
        clientId: "shruthi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "shruthi-prom2",
      script: "server.js",
      env: {
        PORT: 3004,
        clientId: "shruthi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "kavya-prom1",
      script: "server.js",
      env: {
        PORT: 3005,
        clientId: "kavya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "kavya-prom2",
      script: "server.js",
      env: {
        PORT: 3006,
        clientId: "kavya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "meghana-prom1",
      script: "server.js",
      env: {
        PORT: 3007,
        clientId: "meghana1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "meghana-prom2",
      script: "server.js",
      env: {
        PORT: 3008,
        clientId: "meghana2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "keerthi-prom1",
      script: "server.js",
      env: {
        PORT: 3009,
        clientId: "keerthi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    },
    {
      name: "keerthi-prom2",
      script: "server.js",
      env: {
        PORT: 3010,
        clientId: "keerthi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"
    }
  ]
};
