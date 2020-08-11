import { Controller, Get, Param } from "@nestjs/common";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(":id")
  getMessages(@Param("id") id: string): Promise<any[]> {
    return this.messageService.getMessagesForChannel(id);
  }
}
