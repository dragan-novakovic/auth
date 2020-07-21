import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
