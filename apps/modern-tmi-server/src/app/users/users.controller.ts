import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { CreateUserDto, DeleteUserDto } from './dto/users.dto';
import { Response } from 'express';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({summary: '모든 User 조회', description: '모든 User를 조회한다'})
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({summary: 'User 조회', description: 'User를 조회한다'})
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: 'User 생성', description: '신규 User를 생성한다'})
  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({description: '신규 User를 생성한다', type: User})
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname
    };
  }

  @Delete()
  @ApiOperation({summary: 'User 삭제', description: 'User를 삭제한다'})
  @ApiBody({type: DeleteUserDto})
  async deleteUser(@Body() deleteUserDto: DeleteUserDto, @Res() res: Response) {
    const {id} = deleteUserDto;
    const result = await this.usersService.deleteUser(id);

    if (result) {
      return res.status(200).send('success');
    } else {
      return res.status(500).send('failure');
    }
  }
}
