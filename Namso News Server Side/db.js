const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: '138186',   
    database: 'namso_news',
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
