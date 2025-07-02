const generateRandomCron = (index, total) => {
  const intervalMinutes = Math.floor(480 / total); // ~48 minutes apart for 10 apps
  const offsetMinutes = index * intervalMinutes;

  const minute = offsetMinutes % 60;
  const hourOffset = Math.floor(offsetMinutes / 60);

  return `${minute} ${hourOffset}/8 * * *`;
};

module.exports = {
  apps: [
    {
      name: "arpitha-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3001,
        clientId: "arpitha1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "shruthi-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3003,
        clientId: "shruthi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "kavya-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3005,
        clientId: "kavya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "meghana-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3007,
        clientId: "meghana1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "keerthi-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3009,
        clientId: "keerthi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "divya-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3011,
        clientId: "divya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "sowmya-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3013,
        clientId: "sowmya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "sneha-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3015,
        clientId: "sneha1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "ramya-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3017,
        clientId: "ramya1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    },
    {
      name: "nidhi-prom1",
      script: "server.js",
      node_args: "--expose-gc",
      env: {
        PORT: 3019,
        clientId: "nidhi1",
        serviceName: "promotion-clients-new"
      },
      autorestart: true,
      max_memory_restart: "450M",
      cron_restart: generateRandomCron(),
      restart_delay: 5000,
      kill_timeout: 5000,
      namespace: "promotions"
    }
  ]
};
