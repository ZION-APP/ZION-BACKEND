const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const BankAccountService = require('../services/bankAccount.service');

// Middlewares
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler');
const {
  createBankAccountSchema,
  bankAccountIdSchema,
  updateBankAccountSchema,
} = require('../utils/schemas/bankAccount.schema');

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  async function (req, res, next) {
    try {
      const { id: user_id } = req.user;

      const bankAccountService = new BankAccountService();
      const bankAccounts = await bankAccountService.getBankAccountsByUser({
        user_id,
      });

      res.status(200).json(bankAccounts);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me/:bank_account_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ bank_account_id: bankAccountIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { id: user_id } = req.user;
      const { bank_account_id } = req.params;

      const bankAccountService = new BankAccountService();
      const bankAccount = await bankAccountService.getBankAccountByUser({
        user_id,
        bank_account_id,
      });

      res.status(200).json(bankAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler(createBankAccountSchema),
  async function (req, res, next) {
    try {
      const { id: user_id } = req.user;
      const { body: bank_account } = req;

      const bankAccountService = new BankAccountService();
      const bankAccountCreated =
        await bankAccountService.createBankAccountByUser({
          bank_account,
          user_id,
        });

      res.status(200).json(bankAccountCreated);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/:bank_account_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ bank_account_id: bankAccountIdSchema }, 'params'),
  validationHandler(updateBankAccountSchema),
  async function (req, res, next) {
    try {
      const { id: user_id } = req.user;
      const { bank_account_id } = req.params;
      const { body: bank_account } = req;

      const bankAccountService = new BankAccountService();
      const bankAccountUpdated =
        await bankAccountService.updateBankAccountsByUser({
          user_id,
          bank_account_id,
          bank_account,
        });

      if (
        bankAccountUpdated &&
        bankAccountUpdated[0] &&
        bankAccountUpdated[0] > 0
      ) {
        res.status(200).json({
          message: 'bank account updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating bank account',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
