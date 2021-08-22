const express = require('express');
const router = express.Router();

// JWT strategy
require('../utils/auth/strategies/jwt');

// Routes
const authRouter = require('./auth.router');
const goalRouter = require('./goal.router');
const userRouter = require('./user.router');
const notificationRouter = require('./notification.router');
const financialEntityRouter = require('./financialEntity.router');
const bankAccountTypeRouter = require('./bankAccountType.router');
const bankAccountRouter = require('./bankAccount.router');
const formRouter = require('./form.router');
const kindOfPersonRouter = require('./kindOfPerson.router');
const fundRouter = require('./fund.router');
const investmentFundRouter = require('./investmentFund.router');


router.get('/', function (req, res, next) {
  res.json({ name: 'API REST ZION', version: '1.0.0' });
});

router.use('/auth', authRouter);
router.use('/goals', goalRouter);
router.use('/users', userRouter);
router.use('/notifications', notificationRouter);
router.use('/financial_entities', financialEntityRouter);
router.use('/bank_account_types', bankAccountTypeRouter);
router.use('/bank_accounts', bankAccountRouter);
router.use('/form', formRouter);
router.use('/kind_of_person', kindOfPersonRouter);
router.use('/funds', fundRouter);
router.use('/investment_funds', investmentFundRouter);


module.exports = router;
