import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repository/notification-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { map } from "rxjs";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository{
    constructor(private prismaService:PrismaService){

    }

    async findById(notificationId: any): Promise<Notification | null> {
        const notification = await this.prismaService.notification.findUnique({
            where:{
                id:notificationId
            },
        });

        if(!notification){
            return null
        }
    
        return PrismaNotificationMapper.toDomain(notification);
    }
    

    async findManyByRecepientId(recepientId: string): Promise<Notification[]> {
       const notifications = await this.prismaService.notification.findMany({
        where:{
            recepientId: recepientId
        }
       }); 

       return notifications.map(PrismaNotificationMapper.toDomain);
    }
    
    async countManyByRecepientId(recepientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where:{
                recepientId:recepientId
            }
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

       await this.prismaService.notification.create({
        data: raw
       });
    }

    async save(notification: Notification): Promise<void> {
       const raw = PrismaNotificationMapper.toPrisma(notification);

       await this.prismaService.notification.update({
        where:{
            id:raw.id
        },
        data: raw
       });
    }
    
}