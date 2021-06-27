const oracledb = require('oracledb');
const { config } = require('../config');

const db_config = {
    user: config.dbUser,
    password: config.dbPassword,
    connectionString: config.dbConnectionString
};


class OracleLib {
    constructor() {
        this.connection;
    }

    async executeSelect(query) {
        if(!this.connection) {
            this.connection = await oracledb.getConnection(db_config);
            console.log('Oracle database connected successfully');
        }

        return this.connection.execute(query, [], {resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT});
    }

    async execute(query) {
        this.connect();
        const result = await this.connection.execute(query);

        this.closeConnection();


        return result;
    }

    connect() {
        if(!this.connection) {
            this.connection = await oracledb.getConnection(db_config);
            console.log('Oracle database connected successfully');
        }
    }

    closeConnection() {
        if(this.connection) {
            this.connection.close();
        }
    }
}

module.exports = OracleLib;