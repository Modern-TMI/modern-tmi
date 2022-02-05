import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CommonEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @CreateDateColumn({
    comment: '생성일자',
  })
  @ApiProperty({ description: '생성 일자' })
  createdDate: Date;

  @UpdateDateColumn({
    comment: '삭제일자',
  })
  @ApiProperty({ description: '수정 일자' })
  updatedDate: Date;
}
