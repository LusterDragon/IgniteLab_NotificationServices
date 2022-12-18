import { Content } from "../entities/content";
import { Notification } from "@application/entities/notification";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecepientNotification } from "./count-recepient-notifications";


describe('Count Recepient Notifications',()=>{
    it('should be able to count recepient  notifications',async ()=>{
        const notificationsRepository = new inMemoryNotificationsRepository();

        const countRecepientNotifications = new CountRecepientNotification(notificationsRepository);

        await notificationsRepository.create( new Notification({
            category:'social',
            content: new Content('Ei! Psiu! Olha a mensagem!'),
            recepientId: 'um id-valido'

        }));

        await notificationsRepository.create( new Notification({
            category:'social',
            content: new Content('Ei! Psiu! Olha a mensagem!'),
            recepientId: 'um id-valido'

        }));

        await notificationsRepository.create( new Notification({
            category:'social',
            content: new Content('Ei! Psiu! Olha a mensagem!'),
            recepientId: 'um outro id-valido'

        }));
       
        const {count} = await countRecepientNotifications.execute({
           recepientId: 'um id-valido'
        });

        expect(count).toEqual(2);
    })

})