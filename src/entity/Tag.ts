// create Entity Article

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  In,
} from "typeorm";
import { Article } from "./Article";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article, (article) => article.tagList)
  articles: Article[];

  static async handleAddTags (tags: string[]) {
    // check if tag exist
    const existingTags = await Tag.find({
      where: {
        name: In(tags),
      },
      select: ["id", "name"],
    });
    const nameExistingTags = existingTags.map((tag) => tag.name);
    // create new if tag not exist
    const newTags = tags
      .filter((tag) => {
        return !nameExistingTags.includes(tag);
      })
      .map((tag) => ({
        name: tag,
      }));
    const newTagsInserted = await Tag.insert(newTags);

    const allTags = [...existingTags, ...newTagsInserted.identifiers];
    return allTags;
  };
}
