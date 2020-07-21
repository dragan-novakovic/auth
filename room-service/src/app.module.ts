import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { Room } from './rooms/rooms.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/CHAT-SERVICE'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'ROOM-SERVICE',
      entities: [Room],
      synchronize: true,
    }),
  ],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
