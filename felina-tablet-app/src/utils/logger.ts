import pino from 'pino';

const isProduction = import.meta.env.PROD;

const pinoConfig: pino.LoggerOptions = {
  level: isProduction ? 'info' : 'debug',
  browser: {
    asObject: true,
  },
};

if (isProduction) {
  pinoConfig.browser!.write = (o) => {
    // Might want to batch these logs and add more robust error handling.
    fetch('https://your-log-ingestion-endpoint.com/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer SECRET_TOKEN'
      },
      body: JSON.stringify(o),
    }).catch(err => console.error('Failed to send log:', err));
  };
}

export const logger = pino(pinoConfig);