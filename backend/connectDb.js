const mysql = require('mysql2/promise');
require('dotenv').config()
const {USERNAME, PASSWORD, DATABASE} = process.env;
// const { MongoClient } = require('mongodb');

// const uri = '';
// const client = new MongoClient(uri);
// await client.connect();
// const connection = client.db(DATABASE);


const connection = mysql.createPool({
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // Unix socketpath for local communication on Unix operating systems.
});


module.exports = connection;
