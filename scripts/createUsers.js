const oracledb = require('oracledb');
const { config } = require('../config');
const bycrypt = require('bcrypt');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection({ user: config.dbUser, password: config.dbPassword, connectionString: config.dbConnectionString });

    console.log('Successfully connected to Oracle Database');

    // Create a table

    await connection.execute(`begin
                                execute immediate 'drop table users';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

    await connection.execute(`create table users (
                                ID number generated always as identity,
                                name varchar2(30),
                                lastname varchar2(30),
                                RUC varchar2(15),
                                email varchar2(30),
                                password varchar2(60),
                                zion_id number default 0,
                                primary key (id))`);

    // Insert some data

    const sql = 'insert into users (name, lastname,RUC,email, password) values(:1, :2, :3, :4, :5)';
    const hashedPassword = await bycrypt.hash('12345', 10);
    const rows =
          [ ['David', 'Leon', '0952866606', 'dakileon@espol.edu.ec', hashedPassword],
            ['David', 'Mendoza', '0000000000', 'drmendozal98@gmail.com', hashedPassword],
            ['Gary', 'Barzola', '1111111111', 'gnbarzol@espol.edu.ec', hashedPassword],
            ['Juan', 'Loor', '0000066666', 'jjloor@espol.edu.ec', hashedPassword],
            ['Xavier', 'Carlier', '2222222222', 'xecarlie@espol.edu.ec', hashedPassword] ];

    let result = await connection.executeMany(sql, rows);

    console.log(result.rowsAffected, 'Rows Inserted');

    connection.commit();

    // Now query the rows back

    result = await connection.execute(
      'select id, name, RUC, email from users',
      [],
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    const rs = result.resultSet;
    let row;

    while ((row = await rs.getRow())) { 
      console.log('ID USER: ',row.ID);
      console.log('USER NAME: ',row.NAME);
      console.log('USER RUC: ',row.RUC);
      console.log('USER EMAIL: ',row.EMAIL);
    }

    await rs.close();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();