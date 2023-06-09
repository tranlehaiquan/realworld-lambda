// create Entity Article

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import toSlug from "../utils/toSlug";
import { Tag } from "./Tag";
import { BaseEntityCustom } from "./BaseEntityCustom";

@Entity()
export class Article extends BaseEntityCustom {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "text", nullable: true })
  body: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "authorId" })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable()
  tagList: Tag[];

  @BeforeInsert()
  async beforeInsert() {
    this.slug =
      toSlug(this.title) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
