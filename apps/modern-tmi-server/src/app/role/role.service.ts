import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Roles } from './types';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  findAll() {
    return this.roleRepository.find();
  }

  async getGuest() {
    return await this.roleRepository.findOne({ role: Roles.Guest });
  }

  async getUser() {
    return await this.roleRepository.findOne({ role: Roles.User });
  }

  async getAdmin() {
    return await this.roleRepository.findOne({ role: Roles.Admin });
  }
}
