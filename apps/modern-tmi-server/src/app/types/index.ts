import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class IBaseEntity {
  @CreateDateColumn()
  @ApiProperty({ description: '생성 일자' })
  createdDate: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정 일자' })
  updatedDate: Date;
}
