import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CommonEntity } from '../../common.entity';
import { Tmi } from '../../tmi/entities/tmi.entity';

@Entity()
export class Comment extends CommonEntity {
  @Column({
    comment: '댓글 내용',
    type: 'text',
  })
  contents: string;

  @Column({
    comment: '댓글 삭제 여부',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Comment) To 대상 엔티티(User)
   *               여러 댓글들은 한명의 작성자가 작성
   */
  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Comment) To 대상 엔티티(Tmi)
   *               여러 댓글들은 하나의 Tmi에 작성
   */
  @ManyToOne(() => Tmi, (tmi) => tmi.comment)
  tmi: Tmi;

  /**
   * 1 : N 관계 설정
   * @OneToMany -> 해당 엔티티(Comment) To 대상 엔티티(Comment)
   *               하나의 댓글 아래에는 대댓글이 달림
   */
  @OneToMany(() => Comment, (comment) => comment.parent)
  reply: Comment[];

  /**
   * N : 1 관계 설정
   * @ManyToOne -> 해당 엔티티(Comment) To 대상 엔티티(Comment)
   *               여러 대댓글은 하나의 Parent를 가짐
   */
  @ManyToOne(() => Comment, (comment) => comment.reply)
  parent: Comment[];
}
