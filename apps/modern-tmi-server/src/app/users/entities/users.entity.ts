import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../types';
import { ApiProperty } from '@nestjs/swagger';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class User extends BaseEntity {
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

  @ManyToMany((type) => Tmi, (tmi) => tmi.favorites, {
    cascade: true,
  })
  @JoinTable()
  favorites: Tmi[];
}
