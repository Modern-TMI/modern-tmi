import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => Tmi, (tmi) => tmi.tags)
  tags: string[];
}
