import * as express from "express";
import { AppDataSource } from "./data-source";

const app = express()


app.use(express.json())

AppDataSource
    .initialize()
    .then(() => app.listen(3500, () => console.log("server listening on port 3500")))
    .catch(err => console.log(err))