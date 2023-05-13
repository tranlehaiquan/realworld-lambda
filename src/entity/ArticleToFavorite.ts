import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Article } from "./Article";
import { BaseEntityCustom } from "./BaseEntityCustom";

@Entity()
export class ArticleToFavorite extends BaseEntityCustom {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  public userId: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column()
  public articleId: string;

  @ManyToOne(() => Article, (article) => article)
  article: Article;

  @CreateDateColumn()
  createdAt: Date;
}
