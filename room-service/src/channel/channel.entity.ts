import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Room } from "../rooms/rooms.entity";

@Entity({ name: "channels" })
export class ChannelEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => Room, (room) => room.channels)
  room: Room;

  @Column()
  name: string;
}
