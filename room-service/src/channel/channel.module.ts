import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { ChannelEntity } from "./channel.entity";
import { RoomEntity } from "../rooms/rooms.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity, RoomEntity])],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [TypeOrmModule],
})
export class ChannelModule {}
