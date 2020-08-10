import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Channel } from "../channel/channel.entity";

@Entity({ name: "rooms" })
export class RoomEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Channel, (channel) => channel.room)
  channels: Channel[];
}
