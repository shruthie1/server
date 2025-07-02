const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/8 * * *`;
};

module.exports = {
  apps: [
    {
      name: "arpitha-prom2",
      script: "server.js",
      env: {
        PORT: 3001,
        clientId: "arpitha2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "0 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "shruthi-prom2",
      script: "server.js",
      env: {
        PORT: 3003,
        clientId: "shruthi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "10 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "kavya-prom2",
      script: "server.js",
      env: {
        PORT: 3005,
        clientId: "kavya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "20 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "meghana-prom2",
      script: "server.js",
      env: {
        PORT: 3007,
        clientId: "meghana2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "30 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "keerthi-prom2",
      script: "server.js",
      env: {
        PORT: 3009,
        clientId: "keerthi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "40 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "divya-prom2",
      script: "server.js",
      env: {
        PORT: 3011,
        clientId: "divya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "50 3 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sowmya-prom2",
      script: "server.js",
      env: {
        PORT: 3013,
        clientId: "sowmya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "0 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "sneha-prom2",
      script: "server.js",
      env: {
        PORT: 3015,
        clientId: "sneha2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "10 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "ramya-prom2",
      script: "server.js",
      env: {
        PORT: 3017,
        clientId: "ramya2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "20 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    },
    {
      name: "nidhi-prom2",
      script: "server.js",
      env: {
        PORT: 3019,
        clientId: "nidhi2",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "30 4 * * *",
      restart_delay: 5000,
      kill_timeout: 3000,
      namespace: "promotions"
    }
  ]
};
