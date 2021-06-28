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
        await this.connect();
        return this.connection.execute(query, [], {resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT});
    }

    async execute(query) {
        await this.connect();
        const result = await this.connection.execute(query,[],
            { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
        return result;
    }

    async executemany(query, row){
        await this.connect();
        const result= await this.connection.executeMany(query,row);
        return result;
    }

    async connect() {
        if(!this.connection) {
            this.connection = await oracledb.getConnection(db_config);
            console.log('Oracle database connected successfully');
        }
    }

    async closeConnection() {
        if(this.connection) {
            await this.connection.release();
            //await this.connection.close();
        }
    }

    async commit(){
        if(this.connection){
            await this.connection.commit();
        }
    }
}

module.exports = OracleLib;