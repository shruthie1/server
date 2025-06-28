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
      cron_restart: "0 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "5 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "10 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "15 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "20 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "25 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "30 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "35 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "40 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
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
      cron_restart: "45 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "divya-prom1",
      script: "server.js",
      env: {
        PORT: 3011,
        clientId: "divya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "50 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "divya-prom2",
      script: "server.js",
      env: {
        PORT: 3012,
        clientId: "divya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "55 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sowmya-prom1",
      script: "server.js",
      env: {
        PORT: 3013,
        clientId: "sowmya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "0 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sowmya-prom2",
      script: "server.js",
      env: {
        PORT: 3014,
        clientId: "sowmya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "5 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sneha-prom1",
      script: "server.js",
      env: {
        PORT: 3015,
        clientId: "sneha1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "10 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sneha-prom2",
      script: "server.js",
      env: {
        PORT: 3016,
        clientId: "sneha2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "15 4 * * *",
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
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "20 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "ramya-prom2",
      script: "server.js",
      env: {
        PORT: 3018,
        clientId: "ramya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "25 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "nidhi-prom1",
      script: "server.js",
      env: {
        PORT: 3019,
        clientId: "nidhi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "30 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "nidhi-prom2",
      script: "server.js",
      env: {
        PORT: 3020,
        clientId: "nidhi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "350M",
      cron_restart: "35 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    }
  ]
};
