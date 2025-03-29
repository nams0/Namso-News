const path = require('path');
// This forces Node.js to look for .env in the parent directory.
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,   
    password: process.env.DB_PASSWORD,   
    database: process.env.DB_NAME,
    timezone: "Z" // Forces UTC timestamps
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
