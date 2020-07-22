import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Room as IRoom } from "./interfaces/rooms.interface";
import { Room } from "./rooms.entity";
import { CreateRoomDto } from "./dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private usersRepository: Repository<Room>
  ) {}

  findAll(): Promise<IRoom[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<IRoom> {
    return this.usersRepository.findOne(id);
  }

  create(room: CreateRoomDto): Promise<Room> {
    const newRoom = this.usersRepository.create(room);
    return this.usersRepository.save(newRoom);
  }

  update(room: Room): Promise<Room> {
    return this.usersRepository.save(room);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
