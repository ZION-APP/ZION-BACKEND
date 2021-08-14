const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const FormJuridicoService = require('../services/formJuridico.service');

// Middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const {
  formJuridicoIdSchema,
  createFormJuridicoSchema,
} = require('../utils/schemas/formJuridico.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['admin']),
  async function (req, res, next) {
    try {
      const formJuridicoService = new FormJuridicoService();
      const forms = await formJuridicoService.getAllForms();
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

      const formJuridicoService = new FormJuridicoService();
      const forms = await formJuridicoService.getFormsByUser({ user_id });

      res.status(200).json(forms);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me/:form_juridico_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_juridico_id: formJuridicoIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { form_juridico_id } = req.params;
      const { id: user_id } = req.user;

      const formJuridicoService = new FormJuridicoService();
      const form = await formJuridicoService.getFormByUser({
        user_id,
        form_juridico_id,
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
  validationHandler(createFormJuridicoSchema),
  async function (req, res, next) {
    try {
      const { body: form_juridico } = req;
      const { id } = req.user;

      const formJuridicoService = new FormJuridicoService();
      const formCreated = await formJuridicoService.createFormByUser({
        form_juridico,
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
  '/me/:form_juridico_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_juridico_id: formJuridicoIdSchema }, 'params'),
  validationHandler(createFormJuridicoSchema),
  async function (req, res, next) {
    try {
      const { body: form_juridico } = req;
      const { form_juridico_id } = req.params;
      const { id: user_id } = req.user;

      const formJuridicoService = new FormJuridicoService();

      const formUpdated = await formJuridicoService.updateFormByUser({
        user_id,
        form_juridico_id,
        form_juridico,
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
  '/me/:form_juridico_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ form_juridico_id: formJuridicoIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { form_juridico_id } = req.params;
      const { id: user_id } = req.user;
      const formJuridicoService = new FormJuridicoService();

      const formDeleted = await formJuridicoService.deleteFormByUser({
        user_id,
        form_juridico_id,
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
