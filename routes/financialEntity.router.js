const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const FinancialEntityService = require('../services/financialEntity.service');

router.get(
  '/catalogue',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    const financialEntityService = new FinancialEntityService();

    const entities = await financialEntityService.getCatalogue();

    res.status(200).json(entities);
  }
);

module.exports = router;
