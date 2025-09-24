/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { io, Socket } from 'socket.io-client';

describe('ChatGateway (ws)', () => {
  let app: INestApplication;
  let client: Socket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(3001); // use different port for testing
  });

  afterAll(async () => {
    client.close();
    await app.close();
  });

  it('should join room and send message', (done) => {
    client = io('http://localhost:3001');

    client.emit('join_room', 1);

    client.on('joined_room', (roomId) => {
      expect(roomId).toBe(1);

      client.emit('send_message', {
        roomId: 1,
        senderId: 1,
        content: 'Hello Test',
      });
    });

    client.on('new_message', (msg) => {
      expect(msg.content).toBe('Hello Test');
      done();
    });
  });
});
