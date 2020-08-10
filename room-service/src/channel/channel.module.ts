import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { ChannelEntity } from "./channel.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [TypeOrmModule],
})
export class ChannelModule {}
