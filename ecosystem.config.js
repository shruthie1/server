module.exports = {
  apps: [
    {
      name: "cms",
      script: "server.js",
      env: {
        PORT: 5001,
        clientId: "cms-nst"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "0 2 * * *",
      restart_delay: 5000,
      namespace: "helpers"
    },
    {
      name: "ums-test",
      script: "server.js",
      env: {
        PORT: 5002,
        clientId: "ums-test"
      },
      autorestart: true,
      max_memory_restart: "300M",
      cron_restart: "0 2 * * *",
      restart_delay: 5000,
      namespace: "helpers"
    }
  ]
};

