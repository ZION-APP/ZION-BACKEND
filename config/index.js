require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbConnectionString: process.env.CONNECTION_STRING,
  authJwtSecret: process.env.AUTH_JWT_SECRET
};

module.exports = { config };
