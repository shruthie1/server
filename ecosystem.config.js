module.exports = {
  apps: [
    {
      name: "cms",
      script: "server.js",
      env: {
        PORT: 4001,
        clientId: "cms-nst"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "0 1 * * *",
      restart_delay: 5000,
      namespace: "helpers"
    }
  ]
};

