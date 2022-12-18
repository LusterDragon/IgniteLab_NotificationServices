import { Content } from "../entities/content";
import { Notification } from "@application/entities/notification";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";


describe('Cancel Notification',()=>{
    it('should be able to cancel a notification',async ()=>{
        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            category:'social',
            content: new Content('Ei! Psiu! Olha a mensagem!'),
            recepientId: 'um id-valido'

        })

        await notificationsRepository.create(notification);
        await cancelNotification.execute({
           notificationId:notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    })

    it('should not be able should not be able to cancel a notification when it does not exist'), async ()=>{
        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(()=> {
            return cancelNotification.execute({
                notificationId:'notification.id'
             })
        }).rejects.toThrow(NotificationNotFound)
    }
})