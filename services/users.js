const OracleLib = require('../lib/oracle');
const bcrypt = require('bcrypt');


class UsersService {

    constructor() {
        this.table = 'users';
        this.oracledb = new OracleLib();
    }

    async createUser({ user }) {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO USERS(name, email, password) VALUES('${name}', '${email}', '${hashedPassword}')`;
        const {rowsAffected} = await this.oracledb.execute(query);

        if(rowsAffected > 0) {
            return 1;
        }
        return 0;
    }

    async getUser({ email }) {
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        // const result = await this.oracledb.execute(query);
        // console.log(result.rows[0]);

        return {id: 1, name: 'Gary', email: 'gnbarzol@espol.edu.ec'};
    }

    async getAll() {
        const query = 'SELECT * FROM users';
        const result = await this.oracledb.execute(query);

        console.log('GET ALL');
        return result;
    }
}

module.exports = UsersService;