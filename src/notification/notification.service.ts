// services/notification.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  async findAll() {
    return this.notificationModel.findAll();
  }

  async findOne(id: number) {
    const notification = await this.notificationModel.findByPk(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async update(id: number, updateDto: UpdateNotificationDto) {
    const notification = await this.findOne(id);
    return notification.update(updateDto);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    await notification.destroy();
    return { message: `Notification #${id} deleted` };
  }
}
