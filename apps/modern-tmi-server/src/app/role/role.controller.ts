import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './types';

@Controller('role')
@ApiTags('Role 확인 ')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @ApiOperation({
    summary: '모든 권한을 조회한다',
    description: `현재 사용하고 있는 권한은 ${Roles.Guest}, ${Roles.User}, ${Roles.Admin} 이다`,
  })
  getRoles() {
    return this.roleService.findAll();
  }

  @Get('guest')
  @ApiOperation({
    summary: `${Roles.Guest} 권한을 조회한다`,
  })
  getGuest() {
    return this.roleService.getGuest();
  }

  @Get('user')
  @ApiOperation({
    summary: `${Roles.User} 권한을 조회한다`,
  })
  getUser() {
    return this.roleService.getUser();
  }

  @Get('admin')
  @ApiOperation({
    summary: `${Roles.Admin} 권한을 조회한다`,
  })
  getAdmin() {
    return this.roleService.getAdmin();
  }
}
