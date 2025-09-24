/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { roomId: number; senderId: number; content: string },
  ) {
    const message = await this.chatService.createMessage(
      data.roomId,
      data.senderId,
      data.content,
    );
    this.server.to(`room_${data.roomId}`).emit('new_message', message);
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(`room_${roomId}`);
    client.emit('joined_room', roomId);
  }
}
