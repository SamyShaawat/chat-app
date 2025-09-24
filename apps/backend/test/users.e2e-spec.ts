/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // login first
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@mail.com', password: 'secret123' });
    token = res.body.access_token;
  });

  it('/users (GET) protected', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/users/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.email).toBe('test@mail.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
