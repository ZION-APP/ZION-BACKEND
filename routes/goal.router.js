const express = require('express');
const router = express.Router();
const passport = require('passport');

// Services
const GoalService = require('../services/goal.service');

// Middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// Schemas
const {
  createGoalSchema,
  goalIdSchema,
  updateGoalSchema,
} = require('../utils/schemas/goal.schema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:goals']),
  async function (req, res, next) {
    try {
      const goalService = new GoalService();
      const goals = await goalService.getAllGoals();
      res.status(200).json(goals);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:goals:me']),
  async function (req, res, next) {
    try {
      const { id } = req.user;

      const goalService = new GoalService();
      const goals = await goalService.getGoalsByUser({ id });

      res.status(200).json(goals);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/me/:goal_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:goal:me']),
  validationHandler({ goal_id: goalIdSchema }, 'params'),
  async function (req, res, next) {
    try {
      const { goal_id } = req.params;
      const { id: user_id } = req.user;

      const goalService = new GoalService();
      const goal = await goalService.getGoalByUser({ goal_id, user_id });

      res.status(200).json(goal);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:goal:me']),
  validationHandler(createGoalSchema),
  async function (req, res, next) {
    try {
      const { body: { fund_id, init_amount, target_amount, target_date } } = req;
      const { body: goal } = req;
      const { id } = req.user;
      const goalService = new GoalService();
      goal.current_amount = init_amount;
      const final = new Date(target_date);
      const hoy = new Date();
      const meses_aportes = (final - hoy) * 12 / 31536000000;
      const meses_aporte_bajo = Math.floor(meses_aportes);
      var tasa = 0;
      if (fund_id == 1) {
        tasa = 0.0608;
      } else if (fund_id == 2) { 
        tasa = 0.0491; 
      }

      // Logica para crear el calculo de meses o cantidad a pagar
      k = (12 * target_amount) - (12 * init_amount) - (tasa * meses_aporte_bajo * init_amount);
      x = 12 * (meses_aporte_bajo - 1) + (tasa * meses_aporte_bajo * (meses_aporte_bajo - 1) / 2);      
      const aportemensual = k / x;
      goal.montly_amount = Math.round(aportemensual*100)/100;


      const goalCreated = await goalService.createGoalByUser({
        goal,
        user_id: id,
      });

      if (goalCreated && goalCreated.id > 0) {
        res.status(201).json({
          goal: goalCreated,
          message: 'goal created successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while creating goal',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/me/:goal_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:goal:me']),
  validationHandler({ goal_id: goalIdSchema }, 'params'),
  validationHandler(updateGoalSchema),
  async function (req, res, next) {
    try {
      const { body: goal } = req;
      const { goal_id } = req.params;
      const { id: user_id } = req.user;

      const goalService = new GoalService();
      const goalUpdated = await goalService.updateGoalByUser({
        user_id,
        goal_id,
        goal,
      });

      if (goalUpdated && goalUpdated[0] && goalUpdated[0] > 0) {
        res.status(200).json({
          message: 'goal updated successfully',
        });
      } else {
        res.status(202).json({
          message: 'error while updating goal',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);



module.exports = router;
