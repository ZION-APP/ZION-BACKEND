const OracleLib = require('../lib/oracle');
const bcrypt = require('bcrypt');


class UsersService {

    constructor() {
        this.table = 'users';
        this.oracledb = new OracleLib();
    }

    async createUser({ user }) {
        console.log("Creating User");
        const { name, email, password } = user;        
        const hashedPassword = await bcrypt.hash(password, 10);
        //const query = `insert into users (name, email, password) values("${name}", "${email}", "${hashedPassword}")`;
        const query = `insert into users (name, email, password) values(:1, :2, :3)`;
        const rows =
           [[name, email , hashedPassword]];
        const result= await this.oracledb.executemany(query,rows);  
        if(result.rowsAffected> 0) {
            this.oracledb.commit();
            this.oracledb.closeConnection();
            return 1;
        }else{
            return 0;
        }
            
    }

    async getUser({ email }) {
        const query = `SELECT id,name,email,password FROM users WHERE email = '${email}'`;
        const result = await this.oracledb.execute(query);
        let registro = await result.resultSet.getRow();
        if(result){   
            this.oracledb.closeConnection();
            return {id: registro.ID, name: registro.NAME, email: registro.EMAIL,password: registro.PASSWORD};
        }
        return 0;
    }

    async getAll() {
        const query = 'SELECT * FROM users';
        const result = await this.oracledb.execute(query);

        console.log('GET ALL');
        return result;
    }
}

module.exports = UsersService;