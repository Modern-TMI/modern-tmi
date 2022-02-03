import { Injectable } from '@nestjs/common';
import { CreateTmiDto } from './dto/create-tmi.dto';
import { UpdateTmiDto } from './dto/update-tmi.dto';

@Injectable()
export class TmiService {
  create(createTmiDto: CreateTmiDto) {
    return 'This action adds a new tmi';
  }

  findAll() {
    return `This action returns all tmi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tmi`;
  }

  update(id: number, updateTmiDto: UpdateTmiDto) {
    return `This action updates a #${id} tmi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tmi`;
  }
}
