import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room as IRoom } from './interfaces/rooms.interface';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private usersRepository: Repository<Room>,
  ) {}
  private readonly rooms: IRoom[] = [];

  create(room: IRoom): void {
    this.rooms.push(room);
  }

  findAll(): Promise<IRoom[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<IRoom> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
