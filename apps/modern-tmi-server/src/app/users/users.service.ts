import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { hashing } from '../util/encryption';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

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
