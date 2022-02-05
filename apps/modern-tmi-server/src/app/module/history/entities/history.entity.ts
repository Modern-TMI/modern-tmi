import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { CommonEntity } from '../../common.entity';

@Entity()
export class History extends CommonEntity {
  @Column({
    comment: '히스토리버전. 글이 신규 작성되거나, 수정된 경우 버전이 증가한다.',
    type: 'smallint',
    unsigned: true,
  })
  version: number;

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(History) To 대상 엔티티(User)
   *               여러 히스토리들은 한명의 작성자를 가짐
   */
  @ManyToOne(() => User, (user) => user.history)
  user: User;

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Tmi) To 대상 엔티티(User)
   *               여러 히스토리들은 하나의 Tmi에 종속됨
   */
  @ManyToOne(() => Tmi, (tmi) => tmi.history)
  tmi: Tmi;
}
