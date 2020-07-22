import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Entites
import { Room } from "./rooms/rooms.entity";

// Modules
import { RoomsModule } from "./rooms/rooms.module";

@Module({
  imports: [
    RoomsModule,
    MongooseModule.forRoot("mongodb://localhost:27017/CHAT-SERVICE"),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5555,
      username: "docker",
      password: "docker",
      database: "ROOM-SERVICE",
      entities: [Room],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}