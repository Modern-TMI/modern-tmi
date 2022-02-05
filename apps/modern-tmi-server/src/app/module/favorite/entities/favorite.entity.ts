import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { CommonEntity } from '../../common.entity';

@Entity()
export class Favorite extends CommonEntity {
  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Favorite) To 대상 엔티티(User)
   *               여러 즐겨찾기를 가진 한명의 유저가 있음
   */
  @ManyToOne(() => User, (user) => user.favorite)
  user: User;

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Favorite) To 대상 엔티티(Tmi)
   *               여러 즐겨찾기들은 하나의 Tmi를 가리킴
   */
  @ManyToOne(() => Tmi, (tmi) => tmi.favorite)
  tmi: Tmi;
}
