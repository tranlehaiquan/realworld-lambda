// create Entity Article

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { User } from "./User";
import toSlug from "../utils/toSlug";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "text", nullable: true })
  body: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  tagList: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "authorId" })
  author: User;

  @BeforeInsert()
  async beforeInsert() {
    this.slug = toSlug(this.title) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}