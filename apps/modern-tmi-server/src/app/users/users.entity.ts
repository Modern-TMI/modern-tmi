import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './types';
import { Role } from '../role/role';

@Entity()
export class User implements BaseEntity, IUser {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: '이메일 주소' })
  email: string;

  @Column({ default: true })
  @ApiProperty({ description: '삭제 여부' })
  isActive: boolean;

  @Column({ nullable: false })
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'RefreshToken' })
  refreshToken: string | null;

  @OneToOne(() => Role)
  @JoinColumn()
  @ApiProperty({ description: '권한' })
  role: Role;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정 일자 ' })
  updatedDate: Date;

  @CreateDateColumn()
  @ApiProperty({ description: '생성 일자' })
  createdDate: Date;
}
