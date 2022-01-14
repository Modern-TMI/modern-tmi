import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  constructor() {
    super();
  }
}
