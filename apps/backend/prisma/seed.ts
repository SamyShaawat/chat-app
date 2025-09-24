/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password for demo users
  const passwordHash = await bcrypt.hash('secret123', 10);

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'test@mail.com' },
    update: {},
    create: {
      email: 'test@mail.com',
      password: passwordHash,
      name: 'Test User',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alice@mail.com' },
    update: {},
    create: {
      email: 'alice@mail.com',
      password: passwordHash,
      name: 'Alice',
    },
  });

  // Create Rooms
  const room1 = await prisma.room.upsert({
    where: { name: 'General' },
    update: {},
    create: {
      name: 'General',
    },
  });

  const room2 = await prisma.room.upsert({
    where: { name: 'Random' },
    update: {},
    create: {
      name: 'Random',
    },
  });

  // Create Messages
  await prisma.message.createMany({
    data: [
      {
        content: 'Hello everyone!',
        senderId: user1.id,
        roomId: room1.id,
      },
      {
        content: 'Hey Test User 👋',
        senderId: user2.id,
        roomId: room1.id,
      },
      {
        content: 'This is a random chat message.',
        senderId: user2.id,
        roomId: room2.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
