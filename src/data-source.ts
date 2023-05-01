import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

let connected = false;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database-1.cszuztaijdzp.us-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "urEk|[G~4sltqJ%*zf)8SePM]1A-",
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
