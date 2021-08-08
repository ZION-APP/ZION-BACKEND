const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const BankAccountTypeService = require('../services/bankAccountType.service');

router.get(
  '/catalogue',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const bankAccountTypeService = new BankAccountTypeService();

      const bankAccountTypes = await bankAccountTypeService.getCatalogue();

      res.status(200).json(bankAccountTypes);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
