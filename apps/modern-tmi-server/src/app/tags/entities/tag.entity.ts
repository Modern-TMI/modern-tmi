import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { BaseEntity } from '../../types';

@Entity('tag')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Tmi, (tmi) => tmi.tags)
  tags: string[];
}

// https://gilssang97.tistory.com/46
