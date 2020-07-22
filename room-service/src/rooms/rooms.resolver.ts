import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { RoomsService } from "./rooms.service";
import { Room } from "./rooms.model";

@Resolver((of) => Room)
export class RoomsResolver {
  constructor(private roomService: RoomsService) {}

  @Query((returns) => Room)
  async room(@Args("id") id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }
  @Query((returns) => [Room])
  async rooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Mutation((returns) => Room)
  async upvotePost(@Args({ name: "name" }) name: string): Promise<Room> {
    return this.roomService.create({ name });
  }
}
