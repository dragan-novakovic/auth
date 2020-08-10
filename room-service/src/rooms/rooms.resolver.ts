import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomModel } from "./rooms.model";

@Resolver((of) => RoomModel)
export class RoomsResolver {
  constructor(@Inject(RoomsService) private roomService: RoomsService) {}

  // @Query((returns) => Room)
  // async room(@Args("id") id: string): Promise<Room> {
  //   return this.roomService.findOne(id);
  // }
  @Query((returns) => [RoomModel])
  async rooms(): Promise<RoomModel[]> {
    return this.roomService.findAll();
  }

  // @Mutation((returns) => Room)
  // async create(@Args({ name: "name" }) name: string): Promise<Room> {
  //   return this.roomService.create({ name });
  // }
}
