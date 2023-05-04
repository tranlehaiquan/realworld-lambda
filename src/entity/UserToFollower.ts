import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserToFollower extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  public userId: number

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column()
  public followerId: number
  
  @ManyToOne(() => User, (user) => user)
  follower: User;
}
