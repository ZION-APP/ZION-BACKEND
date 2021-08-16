const express = require('express');
const passport = require('passport');
const router = express.Router();

// Services
const NotificationService = require('../services/notification.service');

// Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const {
    notificationIdSchema,
    createNotificationSchema,
} = require('../utils/schemas/notification.schema');

router.get(
    '/me:goal_id',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:notifications:me']),
    async function (req, res, next) {
        try {
          const { id } = req.user;
    
          const notificationService = new NotificationService();
          const notifications = await notificationService.getNotificationsByUser({ id });
    
          res.status(200).json(notifications);
        } catch (err) {
          next(err);
        }
      }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:notifications:me']),
  async function (req, res, next) {
      try {
        const { body: notification } = req;
        const { id } = req.user;
  
        const notificationService = new NotificationService();
        const notifications = await notificationService.createNotificationByUser({ notification, user_id:id });
  
        res.status(200).json(notifications);
      } catch (err) {
        next(err);
      }
    }
);

module.exports = router;