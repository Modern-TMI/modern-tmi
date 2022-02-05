import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { IBaseEntity } from '../../types';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class Comment extends IBaseEntity {
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
