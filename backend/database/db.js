import mysql from "mysql2/promise";

const { HOSTNAME_DB, NAME_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const pool = mysql.createPool({
    host: HOSTNAME_DB,
    database: NAME_DB,
    user: USERNAME_DB,
    password: PASSWORD_DB,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
});

pool.getConnection()
    .then((res) => {
        console.log(`Connected to '${res.config.database}' database`);
    })
    .catch((error) => {
        console.log("Error --> ", error);
    });

export default pool;