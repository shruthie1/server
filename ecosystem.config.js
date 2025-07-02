const generateRandomCron = (index) => {
  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 8) + (8 * (index % 3));
  return `${minute} ${hour}/8 * * *`;
};

module.exports = {
  apps: [
    {
      name: "arpitha-prom1",
      script: "server.js",
      env: {
        PORT: 3001,
        clientId: "arpitha1",
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "0 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "10 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "20 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "30 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "40 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "50 3 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "0 4 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "10 4 * * *",
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
        serviceName: "promotion-clients-prom-5"
      },
      autorestart: true,
      max_memory_restart: "450M",
      generateRandomCron: generateRandomCron(), //: "20 4 * * *",
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
        serviceName: "promotion-clients-prom-5"
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
