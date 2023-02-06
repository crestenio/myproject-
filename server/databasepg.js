const {Client} = require('pg');

const client = new  Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "@dm1N",
    database: "capstoneDB"
});
module.exports = client
