import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBaseEntity } from '../../types';
import { ApiProperty } from '@nestjs/swagger';
import { Tmi } from '../../tmi/entities/tmi.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { History } from '../../history/entities/history.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity()
export class User extends IBaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column()
  @ApiProperty({ description: '이메일 주소' })
  email: string;

  @Column({ default: true })
  @ApiProperty({ description: '삭제 여부' })
  isActive: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'RefreshToken' })
  refreshToken: string | null;

  //#region Relations
  @OneToMany((type) => Tmi, (tmi) => tmi.user)
  tmi: Tmi[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany((type) => History, (history) => history.user)
  history: History[];

  @OneToMany((type) => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];

  //#endregion
}
