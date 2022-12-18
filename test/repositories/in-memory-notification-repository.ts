import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repository/notification-repository";


export class inMemoryNotificationsRepository  implements NotificationsRepository{
    
    public  notifications: Notification[]= [];

    async create(notification:Notification):Promise<void>{
        this.notifications.push(notification);
    }

    async findById(notificationId: any): Promise<Notification | null> {
       const notification = this.notifications.find(item => item.id === notificationId)

       if(!notification){
        return null
       }

       return notification;
    }

    async countManyByRecepientId(recepientId: string): Promise<number> {
       return this.notifications.filter(notification => notification.recipientId === recepientId).length
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(item => item.id === notification.id);

        if(notificationIndex=>0){
            this.notifications[notificationIndex]= notification;
        }
    }
};