const express = require('express');
const router = express.Router();

// JWT strategy
require('../utils/auth/strategies/jwt');

// Routes
const authRouter = require('./auth.router');
const goalRouter = require('./goal.router');
const userRouter = require('./user.router');
const financialEntityRouter = require('./financialEntity.router');
const bankAccountTypeRouter = require('./bankAccountType.router');
const bankAccountRouter = require('./bankAccount.router');

router.get('/', function (req, res, next) {
  res.json({ name: 'API REST ZION', version: '1.0.0' });
});

router.use('/auth', authRouter);
router.use('/goals', goalRouter);
router.use('/users', userRouter);
router.use('/financial_entities', financialEntityRouter);
router.use('/bank_account_types', bankAccountTypeRouter);
router.use('/bank_accounts', bankAccountRouter);

module.exports = router;
