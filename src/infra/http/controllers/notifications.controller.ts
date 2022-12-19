import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecepientNotification } from '@application/use-cases/count-recepient-notifications';
import { GetRecepientNotification } from '@application/use-cases/get-recepient-notification';

@Controller('notifications')
export class NotificationsController {

  constructor(private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecepientNotification: CountRecepientNotification,
    private getRecepientNotifications: GetRecepientNotification) { }

  @Get('count/from/:recepientId')
  async countFromRecepient(@Param('recepientId') recepientId: string) {
    const { count } = await this.countRecepientNotification.execute({
      recepientId
    });

    return { count };
  }

  @Get('from/:recepientId')
  async getFromRecepient(@Param('recepientId') recepientId: string) {
    const { notifications } = await this.getRecepientNotifications.execute({
      recepientId
    });
    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recepientId } = body;

    const { notification } = await this.sendNotification.execute({
      recepientId,
      content,
      category
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
