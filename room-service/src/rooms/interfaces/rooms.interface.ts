import { ChannelEntity } from "../../channel/channel.entity";

export interface IRoom {
  id: string;
  name: string;
  channels: ChannelEntity[];
}
