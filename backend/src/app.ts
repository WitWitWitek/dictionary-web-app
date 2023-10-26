import { config } from "dotenv";
config();

import * as express from "express";
import "express-async-errors";
import * as cookieParser from "cookie-parser";
import repetitionsRouter from "@/router/repetitionsRouter";
import authRouter from "@/router/authRouter";
import * as cors from "cors";
import { errorHandler } from "@/utils/customError";
import { corsOptions } from "@/config/corsOptions";
import userRouter from "@/router/userRouter";
import helmet from "helmet";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/repetitions", repetitionsRouter);
app.use("/user", userRouter);

app.use(errorHandler);

export default app;
