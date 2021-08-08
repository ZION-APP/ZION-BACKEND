// DEBUG=app:* node scripts/seeders/seedApiKeys.js

const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api_keys');
const { sequelize, Sequelize } = require('../../lib/mysql');
const ApiKeyModel = require('../../models/apiKey.model');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:goals',
  'read:goals:me',
  'read:goal:me',
  'create:goal:me',
  'update:goal:me',
  'read:user:all',
  'update:me',
  'read:me',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:goals:me',
  'read:goal:me',
  'create:goal:me',
  'update:goal:me',
  'update:me',
  'read:me',
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const apiKey = ApiKeyModel(sequelize, Sequelize);
    await apiKey.destroy({ truncate: true });

    // const tokens = [generateRandomToken(), generateRandomToken()];
    const tokens = [
      '768918d37137f61bd113cbbe3e0ce8db0914d77922d456752e09020c1909d08e',
      '42c05414538d7fe7f49bb2594849739795dc9fbdda41ce23076a9594edcd6567',
    ];

    // Inserta los scopes del admin user en la tabla 'api-keys'
    const promisesAdmin = adminScopes.map(async (scope) => {
      await apiKey.create({ token: tokens[0], scope });
    });
    // Inserta los scopes del public user en la tabla 'api-keys'
    const promisesPublic = publicScopes.map(async (scope) => {
      await apiKey.create({ token: tokens[1], scope });
    });

    await Promise.all(promisesAdmin);
    await Promise.all(promisesPublic);

    debug(
      chalk.green(
        `${promisesAdmin.length} scopes have been created succesfully for the admin user`
      )
    );
    debug(
      chalk.green(
        `${promisesPublic.length} scopes have been created succesfully for the public user`
      )
    );
    debug(chalk.green(`Token admin: ${tokens[0]}`));
    debug(chalk.green(`Token public: ${tokens[1]}`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

// Revisar las apiKeyGeneradas y agregarlas al .env
seedApiKeys();
