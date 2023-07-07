// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import * as express from "express";
import * as cookieParser from "cookie-parser";
import "express-async-errors";
import { AppDataSource } from "./dataSource";
import repetitionsRouter from "./router/repetitionsRouter";
import authRouter from "./router/authRouter";
import * as cors from "cors";
import { errorHandler } from "./utils/customError";
import { corsOptions } from "./config/corsOptions";
import userRouter from "./router/userRouter";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/repetitions", repetitionsRouter);
app.use("/user", userRouter);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() =>
    app.listen(3500, () => console.log("server listening on port 3500"))
  )
  .catch((err) => console.log(err));
