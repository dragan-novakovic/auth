import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IChannel } from "./interfaces/channel.interface";
import { Channel } from "./channel.entity";
import { CreateChannelDto } from "./dto";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private usersRepository: Repository<IChannel>
  ) {}

  // findAll(): Promise<IChannel[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: string): Promise<IChannel> {
  //   return this.usersRepository.findOne(id);
  // }

  // create(room: CreateChannelDto): Promise<Channel> {
  //   const newRoom = this.usersRepository.create(room);
  //   return this.usersRepository.save(newRoom);
  // }

  // update(room: Channel): Promise<Channel> {
  //   return this.usersRepository.save(room);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
