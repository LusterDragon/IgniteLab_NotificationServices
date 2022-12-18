import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "../repository/notification-repository";



interface GetRecepientNotificationRequest {
  recepientId:string
}

interface GetRecepientNotificationResponse {
    notifications: Notification[]
}

@Injectable()
export class GetRecepientNotification {

    constructor(private notificationsRepository:NotificationsRepository){

    }


    async execute(request: GetRecepientNotificationRequest): Promise<GetRecepientNotificationResponse> {
        const { recepientId } = request;

        const notifications = await this.notificationsRepository.findManyByRecepientId(recepientId);

        return {notifications};
    }
}