const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true,
    connectionLimit: 10
});

module.exports = pool;