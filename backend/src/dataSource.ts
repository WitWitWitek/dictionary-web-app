import "reflect-metadata";
import { DataSource } from "typeorm";
import { Repetition } from "./entity/Repetition";
import { User } from "./entity/User";
import { config } from "dotenv";
import { RepetitionScore } from "./entity/RepetitionScore";
config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST_ADDRESS as string,
  port: 3306,
  username: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,
  synchronize: true,
  logging: false,
  entities: [Repetition, RepetitionScore, User],
});
