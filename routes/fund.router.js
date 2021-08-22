const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const FundService = require('../services/fund.service');

router.get(
  '/catalogue',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const fundService = new FundService();

      const funds = await fundService.getCatalogue();

      res.status(200).json(funds);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
