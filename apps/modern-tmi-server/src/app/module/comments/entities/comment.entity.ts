import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CommonEntity } from '../../common.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class Comment extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @ManyToOne((type) => User, (user) => user.comment)
  user: User;

  @ManyToOne((type) => Tmi, (tmi) => tmi.comment)
  tmi: Tmi;

  @OneToMany((type) => Comment, (comment) => comment.parent)
  reply: Comment[];

  @ManyToOne((type) => Comment, (comment) => comment.reply)
  parent: Comment[];
}
