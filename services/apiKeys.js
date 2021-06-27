const OracleLib = require('../lib/oracle');

class ApiKeysService {
    constructor() {
        this.table = 'api_keys';
        this.oracledb = new OracleLib();
    }

    async getApiKey({ token }) {
        const query = `SELECT * FROM ${this.table} WHERE token = ${token}`;
        const { resultSet } = await this.oracledb.executeSelect(query);
        return resultSet.getRow();
    }
}

module.exports = ApiKeysService;