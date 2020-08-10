import { RoomEntity } from "../../rooms/rooms.entity";

export interface IChannel {
  id: string;
  name: string;
  room: RoomEntity;
}
