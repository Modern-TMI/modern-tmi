import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.favorite)
  user: User;

  @ManyToOne((type) => Tmi, (tmi) => tmi.favorite)
  tmi: Tmi;
}
