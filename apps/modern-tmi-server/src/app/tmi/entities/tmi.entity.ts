import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { BaseEntity } from '../../types';

@Entity('tmi')
export class Tmi extends BaseEntity {
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

  @ManyToMany((type) => User, (user) => user.favorites)
  favorites: User[];

  @ManyToMany((type) => Tag, (tag) => tag.tags)
  tags: Tag[];
}
