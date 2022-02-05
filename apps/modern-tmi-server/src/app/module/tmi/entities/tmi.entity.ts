import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { CommonEntity } from '../../common.entity';
import { History } from '../../history/entities/history.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Tmi extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'TMI의 제목. 최대 길이는 255자',
  })
  @ApiProperty({ description: 'TMI 제목' })
  title: string;

  @Column({
    type: 'text',
    comment: 'TMI의 내용. HTML의 형태의 무언가가 들어갈지도 ..?',
  })
  @ApiProperty({ description: 'TMI 내용' })
  contents: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 0,
    comment: 'TMI의 조회수',
  })
  @ApiProperty({ description: 'View Counts' })
  views: number;

  @Column({
    type: 'smallint',
    unsigned: true,
    comment: 'TMI의 버전. History의 버전과는 상관없이 무조건 증가만 한다.',
  })
  @ApiProperty({ description: 'TMI 버전' })
  version: number;

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(Tmi) To 대상 엔티티(History)
   *               하나의 Tmi는 여러개의 History를 가진다.
   */
  @OneToMany(() => History, (history) => history.tmi)
  history: History[];

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(Tmi) To 대상 엔티티(Favorite)
   *               하나의 Tmi는 여러개의 즐겨찾기를 가진다.
   */
  @OneToMany(() => Favorite, (favorite) => favorite.tmi)
  favorite: Favorite[];

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(Tmi) To 대상 엔티티(Comment)
   *               하나의 Tmi는 여러개의 댓글을 가진다.
   */
  @OneToMany(() => Comment, (comment) => comment.tmi)
  comment: Comment[];

  /**
   * N : M 관계 설정
   * @ManyToMany -> 해당 엔티티(Tmi) To 대상 엔티티(Tag)
   *                여러 Tmi는 여러개의 태그를 가진다.
   */
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Tmi) To 대상 엔티티(User)
   *               Tmi들은 하나의 작성자(User)를 가짐
   * @description  가장 마지막에 수정한 User만 저장
   */
  @ManyToOne(() => User, (user) => user.tmi)
  user: User;
}
