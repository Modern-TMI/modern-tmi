import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { IBaseEntity } from '../../types';

@Entity('tag')
export class Tag extends IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Tmi, (tmi) => tmi.tags)
  tags: string[];
}

// https://gilssang97.tistory.com/46
