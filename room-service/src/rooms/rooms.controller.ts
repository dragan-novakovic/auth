import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

import { CreateRoomDto, UpdateRoomDto, QueryRoom } from './dto';
import { Room } from './interfaces/rooms.interface';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: QueryRoom): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): string {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
