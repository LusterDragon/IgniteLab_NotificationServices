import { NotificationsRepository } from "../repository/notification-repository";
import { Injectable } from "@nestjs/common/decorators";


interface CountRecepientNotificationRequest {
  recepientId:string
}

interface CountRecepientNotificationResponse {
    count:number
}

@Injectable()
export class CountRecepientNotification {

    constructor(private notificationsRepository:NotificationsRepository){

    }


    async execute(request: CountRecepientNotificationRequest): Promise<CountRecepientNotificationResponse> {
        const { recepientId } = request;

        const count = await this.notificationsRepository.countManyByRecepientId(recepientId);

        return {count};
    }
}