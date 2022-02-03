import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
