import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Room } from "../rooms/rooms.entity";

@Entity({ name: "channels" })
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => Room, (room) => room.channelId)
  roomId: string;

  @Column()
  name: string;
}
