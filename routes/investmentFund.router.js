const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const InvestmentFundService = require('../services/investmentFund.service');
const GoalService = require('../services/goal.service');

// Middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const {
  iFundIdSchema,
  createIFundSchema,
  updateIFundSchema
} = require('../utils/schemas/investmentFund.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['admin']),
  async function (req, res, next) {
    try {
      const investmentFundService = new InvestmentFundService();
      const iFunds = await investmentFundService.getAllInvestmentFund();
      res.status(200).json(iFunds);
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

      const investmentFundService = new InvestmentFundService();
      const iFunds = await investmentFundService.getInvestmentFundsByUser({ user_id });

      res.status(200).json(iFunds);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me/:iFund_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler({ iFund_id: iFundIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { iFund_id } = req.params;
      const { id: user_id } = req.user;

      const investmentFundService = new InvestmentFundService();
      const iFund = await investmentFundService.getInvestmentFundByUser({ user_id, iFund_id });

      res.status(200).json(iFund);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),
  validationHandler(createIFundSchema),
  async function (req, res, next) {
    try {
      const { body: iFund } = req;
      const { id: user_id } = req.user;
      const isNewFund = iFund.is_new_fund;
      if(isNewFund) {
        iFund.current_amount = iFund.init_amount;
        const final = new Date(iFund.target_date);
        const hoy = new Date();
        const meses_aportes = (final - hoy) * 12 / 31536000000;
        const meses_aporte_bajo = Math.floor(meses_aportes);
        var tasa = 0;
        if (iFund.fund_id == 1) {
          tasa = 0.0608;
        } else if (iFund.fund_id == 2) { 
          tasa = 0.0491; 
        }
  
        // Logica para crear el calculo de meses o cantidad a pagar
        k = (12 * iFund.target_amount) - (12 * iFund.init_amount) - (tasa * meses_aporte_bajo * iFund.init_amount);
        x = 12 * (meses_aporte_bajo - 1) + (tasa * meses_aporte_bajo * (meses_aporte_bajo - 1) / 2);      
        const aportemensual = k / x;
        iFund.montly_amount = Math.round(aportemensual*100)/100;
      }

      const investmentFundService = new InvestmentFundService();
      const iFundCreated = await investmentFundService.createInvestmentFundByUser({
        iFund,
        user_id,
      });

      if (iFundCreated && iFundCreated.id > 0) {
        res.status(201).json({
          investmentFund: iFundCreated,
          message: 'Investment fund created successfully',
        });
      } else {
        res.status(202).json({
          message: 'Error while creating Investment fund',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/:iFund_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['public']),  
  validationHandler({ iFund_id: iFundIdSchema }, 'params'),
  validationHandler(updateIFundSchema),
  async function (req, res, next) {
    try {
      const { body: iFund } = req;
      const { iFund_id } = req.params;
      const { id: user_id } = req.user;

      const investmentFundService = new InvestmentFundService();
      const iFundUpdated = await investmentFundService.updateInvestmentFundByUser({
        iFund,
        iFund_id,
        user_id,
      });

      if (iFundUpdated && iFundUpdated[0] && iFundUpdated[0] > 0) {
        res.status(200).json({
          message: 'Investment fund updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'Error while updating Investment fund',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);



module.exports = router;
