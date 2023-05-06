import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Article } from "./entity/Article";
import { UserToFollower } from "./entity/UserToFollower";
import { Comment } from "./entity/Comment";
import { ArticleToFavorite } from "./entity/ArticleToFavorite";

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
  entities: [User, Article, UserToFollower, Comment, ArticleToFavorite],
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
