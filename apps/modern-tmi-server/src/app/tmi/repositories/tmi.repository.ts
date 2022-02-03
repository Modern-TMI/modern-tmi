import { EntityRepository, Repository } from 'typeorm';
import { Tmi } from '../entities/tmi.entity';

@EntityRepository(Tmi)
export class TmiRepository extends Repository<Tmi> {}
