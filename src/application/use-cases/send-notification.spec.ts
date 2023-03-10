import { SendNotification } from "./send-notification"
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";

describe('Send Notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();

        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'An awesome notification',
            category: 'Social',
            recepientId: 'new-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    })
})