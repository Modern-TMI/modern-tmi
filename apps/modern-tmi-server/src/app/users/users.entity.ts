import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from './types';

@Entity()
export class User implements BaseEntity, IUser {

  @PrimaryGeneratedColumn()
  @ApiProperty({description: 'id'})
  id: number;

  @Column({nullable: false})
  @ApiProperty({description: '이메일 주소'})
  email: string;

  @Column({default: true})
  @ApiProperty({description: '삭제 여부'})
  isActive: boolean;

  @Column({nullable: false})
  @ApiProperty({description: '닉네임'})
  nickname: string;

  @Column()
  @ApiProperty({description: '비밀번호'})
  password: string;

  @UpdateDateColumn()
  @ApiProperty({description: '수정 일자 '})
  updatedDate: Date;

  @CreateDateColumn()
  @ApiProperty({description: '생성 일자'})
  createdDate: Date;
}
