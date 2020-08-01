import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Room {
  @Field({ nullable: false })
  id: string;

  @Field()
  name?: string;
}
