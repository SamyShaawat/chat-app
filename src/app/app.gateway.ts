import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AppService } from "../app.service.js";
import { Prisma } from "@prisma/client";
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    client: Socket,
    payload: Prisma.ChatCreateInput,
  ): Promise<void> {
    const newMessage = await this.appService.createMessage(payload);
    this.server.emit("recMessage", newMessage);
  }

  afterInit(server: Server) {
    console.log(server);
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
