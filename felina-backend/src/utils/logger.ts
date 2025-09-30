import pino from "pino";

const isProduction = process.env["NODE_ENV"] === "production";

const logger = pino({
  level: process.env["LOG_LEVEL"] || "info",

  redact: isProduction ? ['customer', 'customer.name', 'customer.email', 'customer.address'] : [],

  formatters: {
    level(label) {
      return { level: label };
    },
  },

  base: null,

  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    err: pino.stdSerializers.err,

    user: (user: { id: string }) => {
      return { id: user.id };
    },
  },

  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: { colorize: true },
      },
});

export default logger;