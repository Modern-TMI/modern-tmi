import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/users.dto';
import { hashing, isMatchHash } from '../util/encryption';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository()
      }]
    }).compile();

    usersController =  module.get<UsersController>(UsersController);
    usersService =  module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });


  describe('Create User', () => {
    it('신규 User를 생성한다', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const nickname = faker.internet.userName();

      // Mock 저장은 hashing을 수동으로 해줌
      const createUserDtoWithHash = new CreateUserDto();
      createUserDtoWithHash.email = email;
      createUserDtoWithHash.password = hashing(password);
      createUserDtoWithHash.nickname = nickname;

      userRepository.save.mockResolvedValue(createUserDtoWithHash); // 성공한다고 가정

      // service를 사용하는 것은 service 내에서 hash를 해줌
      const createUserDto = new CreateUserDto();
      createUserDto.email = email;
      createUserDto.password = password;
      createUserDto.nickname = nickname;
      const result = await usersService.createUser(createUserDto);

      expect(userRepository.save).toHaveBeenCalledTimes(1); // save가 1번 불려졌는지

      expect(isMatchHash(password, result.password)).toEqual(isMatchHash(password, createUserDto.password));
    });
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

});
