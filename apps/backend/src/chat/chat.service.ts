/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createMessage(roomId: number, senderId: number, content: string) {
    return this.prisma.message.create({
      data: {
        content,
        roomId,
        senderId,
      },
      include: {
        sender: true,
        room: true,
      },
    });
  }

  async getMessages(roomId: number) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
    });
  }
}
