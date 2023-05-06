import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Article } from "./Article";

@Entity()
export class ArticleToFavorite extends BaseEntity {
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
