import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "channels" })
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
