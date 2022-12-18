import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repository/notification-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository{
    constructor(private prismaService:PrismaService){

    }
    countManyByRecepientId(recepientId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async findById(notificationId: any): Promise<Notification | null> {
        throw new Error("Method not implemented.");
    }
    

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

       await this.prismaService.notification.create({
        data: raw
       });
    }

    async save(notification: Notification): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}