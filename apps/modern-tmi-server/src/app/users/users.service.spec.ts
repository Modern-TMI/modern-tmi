import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
/*
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


  describe('신규 유저를 생성한다', () => {

    const createUserData = () => {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const nickname = faker.internet.userName();

      return {email, password, nickname};
    }
    const userMock = (email: string, password: string, nickname?: string) => {
      const userMock = new CreateUserDto();

      userMock.email = email;
      // Mock 저장은 hashing을 수동으로 해줌
      userMock.password = hashing(password);

      if (nickname) {
        userMock.nickname = nickname;
      }

      return userMock;
    }
    const userDto = async (email: string, password: string, nickname?: string) => {
      const createUserDto = new CreateUserDto();
      createUserDto.email = email;
      createUserDto.password = password;

      if (nickname) {
        createUserDto.nickname = nickname;
      }

      const result = await usersService.createUser(createUserDto);
      return result
    }


    it('신규 User를 생성한다', async () => {
      const {email, password, nickname} = createUserData();
      const user = userMock(email, password, nickname);

      userRepository.save.mockResolvedValue(user); // 성공한다고 가정

      // service를 사용하는 것은 service 내에서 hash를 해줌
      const result = await userDto(email, password, nickname);

      expect(userRepository.save).toHaveBeenCalledTimes(1); // save가 1번 불려졌는지

      expect(isMatchHash(password, result.password)).toEqual(isMatchHash(password, user.password));
    });

    it('nickname이 없어, 신규 User 생성에 실패한다', async () => {
      const {email, password} = createUserData();
      const user = userMock(email, password);

      userRepository.save.mockRejectedValue(user);  // 실패한다고 가정

      const result = await userDto(email, password);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
    })
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

});
*/
