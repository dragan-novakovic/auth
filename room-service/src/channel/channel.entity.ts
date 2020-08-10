import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { RoomEntity } from "../rooms/rooms.entity";

@Entity({ name: "channels" })
export class ChannelEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => RoomEntity, (room) => room.channels)
  room: RoomEntity;

  @Column()
  name: string;
}
