import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";

import { CreateRoomDto, QueryRoom } from "./dto";
import { Room } from "./interfaces/rooms.interface";

@Controller("rooms")
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  findAll(@Query() query: QueryRoom): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: Room): Promise<Room> {
    return this.roomsService.update(updateRoomDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.roomsService.remove(id);
  }
}
