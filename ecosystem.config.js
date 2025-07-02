const CONFIG = {
  BASE_PORT: 3001,
  PORT_INCREMENT: 2,
  MAX_MEMORY: "450M",
  RESTART_DELAY: 5000,
  KILL_TIMEOUT: 3000,
  CRON_PERIOD_MINUTES: 480,
  DEFAULT_SERVICE_NAME: "promotion-clients-prom-5"
};

const generateRandomCron = (index, total) => {
  const intervalMinutes = Math.floor(CONFIG.CRON_PERIOD_MINUTES / total);
  const offsetMinutes = index * intervalMinutes;
  const minute = offsetMinutes % 60;
  const hour = Math.floor(offsetMinutes / 60);
  const hours = [];
  for (let i = 0; i < 3; i++) {
    hours.push((hour + (i * 8)) % 24);
  }
  hours.sort((a, b) => a - b);
  return `${minute} ${hours.join(',')} * * *`;
};

const createAppConfig = (clientConfig, index) => {
  const clientId = typeof clientConfig === 'string' ? clientConfig : clientConfig.id;
  const serviceName = typeof clientConfig === 'object' && clientConfig.serviceName
    ? clientConfig.serviceName
    : CONFIG.DEFAULT_SERVICE_NAME;

  return {
    name: `${clientId}-prom2`,
    script: "server.js",
    env: {
      PORT: CONFIG.BASE_PORT + (index * CONFIG.PORT_INCREMENT),
      clientId: `${clientId}2`,
      serviceName: serviceName
    },
    autorestart: true,
    max_memory_restart: CONFIG.MAX_MEMORY,
    restart_delay: CONFIG.RESTART_DELAY,
    kill_timeout: CONFIG.KILL_TIMEOUT,
    namespace: "promotions",
    cron_restart: generateRandomCron(index, 10)
  };
};
// Client configurations - can be strings or objects with custom serviceName
const clientNames = [
  "arpitha",
  "shruthi",
  "kavya",
  "meghana",
  "keerthi",
  "divya",
  "sowmya",
  "sneha",
  "ramya",
  "nidhi"
  // Example of custom service name:
  // { id: "special-client", serviceName: "custom-service-name" }
];
const appsList = clientNames.map((clientId, index) => createAppConfig(clientId, index));
const ports = appsList.map(app => app.env.PORT);
const duplicatePorts = ports.filter((port, index) => ports.indexOf(port) !== index);
if (duplicatePorts.length > 0) {
  throw new Error(`Duplicate ports detected: ${duplicatePorts.join(', ')}`);
}

module.exports = {
  apps: appsList
};
