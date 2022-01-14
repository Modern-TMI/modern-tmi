import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  exports: [RoleService, TypeOrmModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
