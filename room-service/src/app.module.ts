import { join } from "path";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
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
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
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

//TODO
//1. Channel Model
//2. User Model
//3. Connect to sockets
