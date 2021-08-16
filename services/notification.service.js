const { Notification } = require('../models');

class NotificationService {
    constructor() {
      this.table = Notification;
    }
  
    async getAllNotifications() {
      const notification = await this.table.findAll({
        attributes: { exclude: ['updatedAt'] },
        where: {
          status: 'active',
        },
      });
      return notification;
    } 

    async getNotificationsByUser({ id }) {
        const notification = await this.table.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: {
              user_id: id,
              status: 'active',
            },
          });
        return notification;
    } 
    async createNotificationByUser({ notification, user_id }) {
        const notificationCreated = await this.table.create({
          ...notification,
          user_id,
        });
        return notificationCreated.id ? notificationCreated : null;
    }
    async createGlobalNotification({ notification, users }) {
        users.forEach(user => createNotificationByUser({notification,user}));       
        return true;
    }
        

  }
  
  module.exports = NotificationService;