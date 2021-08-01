const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const authApi = require('./routes/auth.router');
const { config } = require('./config/index');
const { 
    logErrors, 
    wrapErrors, 
    errorHandler
} = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const { dbConection } = require('./lib/mysql');

// Morgan
app.use(morgan('dev'));

// Cors
app.use(cors());

// Body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security
app.use(helmet());

// Passport
app.use(passport.initialize());

// Database
dbConection();

//Routes
authApi(app);

//Middleware de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//NotFound, catch 404
app.use(notFoundHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});

