import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
  constructor(private messageRepository: any) {}

  async getMessagesForChannel(id: string): Promise<any[]> {
    return [];
  }
}
