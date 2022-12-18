import { Notification} from "../entities/notification";

export abstract class NotificationsRepository{
    abstract create(notification:Notification):Promise<void>
    abstract findById(notificationId):Promise<Notification|null>;
    abstract save(notification:Notification):Promise<void>;
    abstract countManyByRecepientId(recepientId:string):Promise<number>;
}