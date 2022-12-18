import { Content } from "./content"
import {Notification} from "./notification";

describe('Notification', () => {
    it('should be able to create a notification.', () => {
        const notification = new Notification({
            content: new Content("New friendship request."),
            category:'Social',
            recepientId:'Valid-recipient-Id'
        });

        expect(notification).toBeTruthy();
    })
})

