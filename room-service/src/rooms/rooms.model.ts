import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Room {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  name?: string;
}
