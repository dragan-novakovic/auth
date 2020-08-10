import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { RoomEntity } from "./rooms.entity";
import { RoomsResolver } from "./rooms.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomsService, RoomsResolver],
  controllers: [RoomsController],
  exports: [TypeOrmModule],
})
export class RoomsModule {}
