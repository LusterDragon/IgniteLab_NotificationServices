import { Notification } from "../entities/notification";
import { Content } from "../entities/content";
import { NotificationsRepository } from "../repository/notification-repository";
import { Injectable } from "@nestjs/common/decorators";

interface SendNotificationRequest {
    recepientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse{
    notification:Notification
}

@Injectable()
export class SendNotification {

    constructor(private notificationsRepository:NotificationsRepository){

    }

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recepientId, content, category } = request;

        const notification = new Notification({
            recepientId,
            content: new Content(content),
            category
        })

        await this.notificationsRepository.create(notification);

        return {notification};
    }
}