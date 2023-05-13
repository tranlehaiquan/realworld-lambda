import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { BaseEntityCustom } from "./BaseEntityCustom";

@Entity()
export class UserToFollower extends BaseEntityCustom {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  public userId: number;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column()
  public followerId: number;

  @ManyToOne(() => User, (user) => user)
  follower: User;
}
