import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Article } from "./entity/Article";
import { UserToFollower } from "./entity/UserToFollower";
import { Comment } from "./entity/Comment";
import { ArticleToFavorite } from "./entity/ArticleToFavorite";
import { Tag } from "./entity/Tag";

let connected = false;

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const AppDataSource = new DataSource({
  type: "postgres",
  ...dbConfig,
  synchronize: true,
  logging: false,
  entities: [User, Article, UserToFollower, Comment, ArticleToFavorite, Tag],
  migrations: [],
  subscribers: [],
  ssl: true,
});

export const connect = async () => {
  if (connected) {
    return;
  }

  await AppDataSource.initialize();
  connected = true;
};
