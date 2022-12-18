import { Notification } from "../entities/notification";

export abstract class NotificationsRepository{
    abstract create(notifcication:Notification):Promise<void>
}