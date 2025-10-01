import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import httpLogger, { pinoHttp } from "pino-http";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { verifyApiKey } from "./middleware/authMiddleware.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env["PORT"] || 3000;

app.use(pinoHttp({ logger }));

const corsOptions = {
  origin: process.env["ALLOWED_ORIGIN"],
};
app.use(cors(corsOptions));

app.use(express.json());

const apiRouter = express.Router();
apiRouter.use(verifyApiKey);

apiRouter.use("/products", productRoutes);
apiRouter.use("/orders", orderRoutes);

app.use("/api", apiRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Felina Backend is running!");
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const requestLogger = req.log;
  requestLogger.error({ err }, "An unhandled error occurred in a request handler");

  const isProduction = process.env["NODE_ENV"] === "production";
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: isProduction ? undefined : err.stack,
  });
});


app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
