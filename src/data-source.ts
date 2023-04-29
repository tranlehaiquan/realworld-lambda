import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

let connected = false;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const connect = async () => {
  if (connected) {
    return;
  }

  await AppDataSource.initialize();
  connected = true;
}
