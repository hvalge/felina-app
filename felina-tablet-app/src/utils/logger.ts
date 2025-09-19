import pino from 'pino';

const isProduction = import.meta.env.PROD;

export const logger = pino({
  browser: {
    asObject: true,
  },
  level: isProduction ? 'info' : 'debug',
});
