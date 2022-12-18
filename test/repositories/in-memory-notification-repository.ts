import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repository/notification-repository";


export class inMemoryNotificationsRepository  implements NotificationsRepository{
    public  notifications: Notification[]= [];

    async create(notification:Notification):Promise<void>{
        this.notifications.push(notification);
    }
};