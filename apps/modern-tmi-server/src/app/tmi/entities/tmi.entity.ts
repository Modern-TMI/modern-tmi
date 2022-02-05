import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { IBaseEntity } from '../../types';
import { History } from '../../history/entities/history.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity('tmi')
export class Tmi extends IBaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column()
  @ApiProperty({ description: 'TMI 제목' })
  title: string;

  @Column()
  @ApiProperty({ description: 'TMI 내용' })
  contents: string;

  @Column({ default: 0 })
  @ApiProperty({ description: 'View Counts' })
  views: number;

  @Column()
  @ApiProperty({ description: 'TMI 버전' })
  version: number;

  //#region Relations
  @OneToMany((type) => History, (history) => history.tmi)
  history: History[];

  @OneToMany((type) => Favorite, (favorite) => favorite.tmi)
  favorite: Favorite[];

  @OneToMany((type) => Comment, (comment) => comment.tmi)
  comment: Comment[];

  @OneToMany((type) => Tag, (tag) => tag.name)
  tags: Tag[];

  // 가장 마지막에 수정한 유저만 저장. 전체 유저 기록은 히스토리에서 확인
  @ManyToOne((type) => User, (user) => user.tmi)
  user: User;
  //#endregion
}
