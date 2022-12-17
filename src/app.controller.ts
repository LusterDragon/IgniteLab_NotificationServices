import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './createNotificationBody';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recepientId } = body;
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipientId: recepientId,

      }
    });
  }
}
