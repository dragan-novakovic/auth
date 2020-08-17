import { Controller, Get, Param } from "@nestjs/common";
import { MessageService } from "./message.service";
import { Message } from "./message.schema";

@Controller("message")
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(":id")
  getMessages(@Param("id") id: string): Promise<Message[]> {
    return this.messageService.getMessagesForChannel(id);
  }

  @Get()
  getAllMessages(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
