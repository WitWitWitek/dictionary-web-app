/* istanbul ignore file */
import { config } from "dotenv";
config();

import { AppDataSource } from "./dataSource";
import app from "./app";

AppDataSource.initialize()
  .then(() => app.listen(3500, () => console.log("server listening on port 3500")))
  .catch((err) => console.log(err));
