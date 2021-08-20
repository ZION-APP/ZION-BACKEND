const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const FormService = require('../services/form.service');

// Middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const {
  formIdSchema,
  createFormSchema,
} = require('../utils/schemas/form.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['admin']),
  async function (req, res, next) {
    try {
      const formService = new FormService();
      const forms = await formService.getAllForms();
      res.status(200).json(forms);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  async function (req, res, next) {
    try {
      const { id: user_id } = req.user;

      const formService = new FormService();
      const forms = await formService.getFormsByUser({ user_id });

      res.status(200).json(forms);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me/:form_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_id: formIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { form_id } = req.params;
      const { id: user_id } = req.user;

      const formService = new FormService();
      const form = await formService.getFormByUser({
        user_id,
        form_id,
      });

      res.status(200).json(form);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler(createFormSchema),
  async function (req, res, next) {
    try {
      const { body: form } = req;
      const { id } = req.user;

      const formService = new FormService();
      const formCreated = await formService.createFormByUser({
        form,
        user_id: id,
      });

      if (formCreated && formCreated.id > 0) {
        res.status(201).json({
          form: formCreated,
          message: 'Formulary created successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while creating formulary',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/:form_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_id: formIdSchema }, 'params'),
  validationHandler(createFormSchema),
  async function (req, res, next) {
    try {
      const { body: form } = req;
      const { form_id } = req.params;
      const { id: user_id } = req.user;

      const formService = new FormService();

      const formUpdated = await formService.updateFormByUser({
        user_id,
        form_id,
        form,
      });

      if (formUpdated && formUpdated[0] && formUpdated[0] > 0) {
        res.status(200).json({
          message: 'Formulary updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating formulary',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/me/:form_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_id: formIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { form_id } = req.params;
      const { id: user_id } = req.user;
      const formService = new FormService();

      const formDeleted = await formService.deleteFormByUser({
        user_id,
        form_id,
      });
      if (formDeleted && formDeleted > 0) {
        res.status(200).json({
          message: 'Formulary deleted successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while deleting formulary',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
