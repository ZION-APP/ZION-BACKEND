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
    const goalService = new GoalService();
    const goals = await goalService.getAllGoals();
    res.status(200).json(goals);
  }
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:goals:me']),
  async function (req, res, next) {
    const { id } = req.user;

    const goalService = new GoalService();
    const goals = await goalService.getGoalsByUser({ id });

    res.status(200).json(goals);
  }
);

router.get(
  '/me/:goal_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:goal:me']),
  validationHandler({ goal_id: goalIdSchema }, 'params'),
  async function (req, res, next) {
    const { goal_id } = req.params;
    const { id: user_id } = req.user;

    const goalService = new GoalService();
    const goal = await goalService.getGoalByUser({ goal_id, user_id });

    res.status(200).json(goal);
  }
);

router.post(
  '/me',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:goal:me']),
  validationHandler(createGoalSchema),
  async function (req, res, next) {
    const { body: goal } = req;
    const { id } = req.user;

    const goalService = new GoalService();

    // Logica para crear el calculo de meses o cantidad a pagar

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
  }
);

router.put(
  '/me/:goal_id',
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:goal:me']),
  validationHandler({ goal_id: goalIdSchema }, 'params'),
  validationHandler(updateGoalSchema),
  async function (req, res, next) {
    const { body: goal } = req;
    const { goal_id } = req.params;
    const { id: user_id } = req.user;

    const goalService = new GoalService();
    const goalUpdated = await goalService.updateGoalByUser({ user_id, goal_id, goal});

    if (goalUpdated && goalUpdated[0] && goalUpdated[0] > 0) {
      res.status(200).json({
        message: 'goal updated successfully',
      });
    } else {
      res.status(202).json({
        message: 'error while updating goal',
      });
    }
  }
);

module.exports = router;
