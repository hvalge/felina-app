import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import httpLogger from "pino-http";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { verifyApiKey } from "./middleware/authMiddleware.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env["PORT"] || 3000;

app.use(httpLogger({ logger }));

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

app.get("/", (_req, res) => {
  res.send("Felina Backend is running!");
});

// app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
//   res.status(500).send("Internal Server Error");
// });

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
