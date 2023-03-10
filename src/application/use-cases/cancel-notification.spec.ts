import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { makeNotification } from "@test/factories/notification-factory";


describe('Cancel Notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);
        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should not be able should not be able to cancel a notification when it does not exist', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();

        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'notification.id'
            })
        }).rejects.toThrow(NotificationNotFound)
    });
})