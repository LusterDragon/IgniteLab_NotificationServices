import { GetRecepientNotification } from "./get-recepient-notification";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { makeNotification } from "@test/factories/notification-factory";



describe('Get Recepient Notifications', () => {
    it('should be able to get all recepient  notifications', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();

        const getRecepientNotifications = new GetRecepientNotification(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recepientId: 'um id-valido' }));

        await notificationsRepository.create(makeNotification({ recepientId: 'um id-valido' }));

        await notificationsRepository.create(makeNotification({ recepientId: 'um outro id-valido' }));

        const { notifications } = await getRecepientNotifications.execute({
            recepientId: 'um id-valido'
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recepientId: 'um id-valido' }),
            expect.objectContaining({ recepientId: 'um id-valido' })
        ]));
    })

})