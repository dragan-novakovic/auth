// import { join } from "path";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { GraphQLModule } from "@nestjs/graphql";
import { Connection } from "typeorm";

// Entites
import { RoomEntity } from "./rooms/rooms.entity";
import { ChannelEntity } from "./channel/channel.entity";

// Modules
import { RoomsModule } from "./rooms/rooms.module";
import { ChannelModule } from "./channel/channel.module";

@Module({
  imports: [
    RoomsModule,
    ChannelModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    //   sortSchema: true,
    // }),
    MongooseModule.forRoot("mongodb://localhost:27017/CHAT-SERVICE"),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5555,
      username: "docker",
      password: "docker",
      database: "ROOM-SERVICE",
      entities: [RoomEntity, ChannelEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

//TODO
//3. Connect to sockets
