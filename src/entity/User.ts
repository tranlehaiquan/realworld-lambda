import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { randomBytes, pbkdf2Sync } from "crypto";
import { BaseEntityCustom } from "./BaseEntityCustom";

export type UserExport = {
  id: number;
  username: string;
  email: string;
  bio: string;
  image: string;
};

@Entity()
export class User extends BaseEntityCustom {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ select: false })
  salt: string;

  @Column({ select: false })
  hash: string;

  // fnc set password
  async setPassword(password: string): Promise<void> {
    this.salt = randomBytes(16).toString("hex");
    this.hash = pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString(
      "hex"
    );
  }

  // find user with username and password
  static async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.findOne({
      where: { email },
      select: ["id", "username", "email", "salt", "hash"],
    });

    if (!user) {
      return null;
    }

    const hash = pbkdf2Sync(password, user.salt, 10000, 512, "sha512").toString(
      "hex"
    );

    if (hash !== user.hash) {
      return null;
    }

    return user;
  }

  // return user without sensitive data
  excludeSensitiveData(): UserExport {
    const { id, username, email, bio, image } = this;
    return { id, username, email, bio, image };
  }
}
