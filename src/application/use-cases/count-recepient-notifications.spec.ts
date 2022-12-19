import { CountRecepientNotification } from "./count-recepient-notifications";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { makeNotification } from "@test/factories/notification-factory";


describe('Count Recepient Notifications', () => {
    it('should be able to count recepient  notifications', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();

        const countRecepientNotifications = new CountRecepientNotification(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recepientId: 'um id-valido' }));

        await notificationsRepository.create(makeNotification({ recepientId: 'um id-valido' }));

        await notificationsRepository.create(makeNotification({ recepientId: 'um outro id-valido' }));

        const { count } = await countRecepientNotifications.execute({
            recepientId: 'um id-valido'
        });

        expect(count).toEqual(2);
    })

})