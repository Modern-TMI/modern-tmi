import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { hashing } from '../util/encryption';
import { CreateUserDto } from './dto/users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  createUser(createUserDto: CreateUserDto) {
    const {email, password, nickname} = createUserDto;
    const user = new User();
    user.email = email;
    user.password = hashing(password);
    user.nickname = nickname;
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    const result = await this.usersRepository.delete({id});
    return !!result.affected;
  }
}
