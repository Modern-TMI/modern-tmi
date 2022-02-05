import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { History } from '../../history/entities/history.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity()
export class User extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: '유저 이메일 주소. 로그인 계정으로 사용. 이메일 길이는 최대 255자',
  })
  @ApiProperty({ description: '이메일 주소' })
  email: string;

  @Column({
    default: true,
    type: 'boolean',
    comment:
      '유저 활성화 여부. 1(true)이면 활성 0(false)이면 비활성. 비활성유저는 로그인 불가',
  })
  @ApiProperty({ description: '삭제 여부' })
  isActive: boolean;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30, // (https://dung-beetle.tistory.com/26) 개발쪽 한글 입력 이슈가 있음. euc-kr, utf-8, unicode 등 한글이 어떻게 들어가는지 확인
    comment:
      '일반 사용자에게 보여지는 닉네임(최대 30자). 비어있으면 임의의 닉네임 생성..(예정).',
  })
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Column({
    comment: '비밀번호',
  })
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({
    nullable: true,
    comment: '리프레시 토큰',
  })
  @ApiProperty({ description: 'RefreshToken' })
  refreshToken: string | null;

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(User) To 대상 엔티티(Tmi)
   *               하나의 유저는 여러개의 Tmi를 가진다.
   */
  @OneToMany(() => Tmi, (tmi) => tmi.user)
  tmi: Tmi[];

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(User) To 대상 엔티티(Comment)
   *               하나의 유저는 여러개의 댓글을 가진다.
   */
  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(User) To 대상 엔티티(History)
   *               하나의 유저는 여러개의 Tmi 히스토리를 가진다.
   */
  @OneToMany(() => History, (history) => history.user)
  history: History[];

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(User) To 대상 엔티티(Favorite)
   *               하나의 유저는 여러개의 Tmi 즐겨찾기를 가진다.
   */
  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];
}
