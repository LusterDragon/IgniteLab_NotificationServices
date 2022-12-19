import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import {Notification as RawNotification} from "@prisma/client";

export class PrismaNotificationMapper{
    static toPrisma(notification:Notification){
        return {
            id: notification.id,
            category:notification.category,
            content: notification.content.value,
            recepientId: notification.recepientId,
            readAt:notification.readAt,
            createdAt:notification.createdAt,
            canceledAt:notification.canceledAt
        };
    }

    static toDomain(raw: RawNotification ):Notification{
        return new Notification({
            category:raw.category,
            content: new Content(raw.content),
            createdAt:raw.createdAt,
            recepientId: raw.recepientId,
            readAt:raw.readAt,
            canceledAt: raw.canceledAt
        }, raw.id);
    }
}