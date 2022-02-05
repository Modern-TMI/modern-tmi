import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common.entity';

@Entity()
export class Tag extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 30,
    comment: '태그명. 최대길이 30자',
  })
  name: string;
}
