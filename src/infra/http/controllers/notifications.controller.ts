import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { SendNotification } from '../../../application/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {

  constructor(private sendNotification:SendNotification){}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recepientId } = body;

    const {notification} = await this.sendNotification.execute({
      recepientId,
      content,
      category
    });

    return notification;
  }
}
