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
      max_memory_restart: "400M",
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
      max_memory_restart: "400M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "promotions"

    }
  ]
};
