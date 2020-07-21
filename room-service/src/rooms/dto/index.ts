export class CreateRoomDto {
  name: string;
}

export class UpdateRoomDto extends CreateRoomDto {
  id: string;
}

export class QueryRoom {
  id: string;
  limit: string;
}
