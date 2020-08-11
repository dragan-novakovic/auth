import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Message extends Document {
  @Prop()
  message: string;
  @Prop()
  username: string;
  @Prop()
  roomId: string;
}
// roomID - cascade delete?
export const MessageSchema = SchemaFactory.createForClass(Message);
