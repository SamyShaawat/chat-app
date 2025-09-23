import { Module } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { PrismaService } from '../prisma/prisma.service.js';
import { AppService } from './app.service.js';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, AppGateway, PrismaService],
})
export class AppModule {}
