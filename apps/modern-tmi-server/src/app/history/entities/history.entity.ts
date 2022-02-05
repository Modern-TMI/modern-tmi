import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((type) => User, (user) => user.history)
  user: User;

  @ManyToOne((type) => Tmi, (tmi) => tmi.history)
  tmi: Tmi;
}
