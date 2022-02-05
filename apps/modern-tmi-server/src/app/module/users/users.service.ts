import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { hashing } from '../../common/helpers/encryption.helper';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * 모든 사용자를 검색한다
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * email을 이용해 사용자를 검색한다
   * @param email
   */
  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  /**
   * id를 이용해 사용자를 검색한다
   * @param id
   */
  findOneById(id: number) {
    return this.usersRepository.findOne(id);
  }

  /**
   * 신규 사용자를 생성한다
   * @param createUserDto
   */
  createUser(createUserDto: CreateUserDto) {
    const { email, password, nickname } = createUserDto;
    const user = new User();
    user.email = email;
    user.password = hashing(password);
    user.nickname = nickname;
    return this.usersRepository.save(user);
  }

  /**
   * 사용자를 삭제한다
   * @param id
   */
  async deleteUser(id: number) {
    const result = await this.usersRepository.delete({ id });
    return !!result.affected;
  }

  /**
   * 사용자의 RefreshToken을 업데이트 한다
   * @param id
   * @param refreshToken
   */
  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.findOneById(id);
    user.refreshToken = refreshToken;
    return await this.usersRepository.update({ id: user.id }, { refreshToken });
  }

  /**
   * 서버에 저장된 Token과 Request 내 Token을 비교
   * @param id
   * @param refreshToken
   */
  async checkMatchRefreshToken(id: number, refreshToken: string) {
    const user = await this.findOneById(id);
    const isRefreshMatch = refreshToken === user.refreshToken;

    if (isRefreshMatch) {
      return user;
    }
  }

  /**
   * 사용자의 RefreshToken을 삭제한다
   * @param id
   */
  async deleteRefreshToken(id: number) {
    return await this.usersRepository.update({ id }, { refreshToken: null });
  }
}
