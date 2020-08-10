import { Field, ObjectType } from "@nestjs/graphql";
import { ChannelEntity } from "../channel/channel.entity";

@ObjectType()
export class Room {
  @Field({ nullable: false })
  id: string;

  @Field()
  name?: string;

  @Field((type) => [ChannelEntity])
  channels: ChannelEntity[];
}
