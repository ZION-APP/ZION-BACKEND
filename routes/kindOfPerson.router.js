const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const KindOfPersonService = require('../services/kindOfPerson.service');

router.get(
  '/catalogue',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const kindOfPersonService = new KindOfPersonService();

      const kindOfPersons = await kindOfPersonService.getCatalogue();

      res.status(200).json(kindOfPersons);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
