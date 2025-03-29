const db = require('./db');

function getAdmins(req, res) {
    const sql = 'SELECT admin_id, admin_name, email, created_at FROM admins';

    db.query(sql, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Database error' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
}

module.exports = { getAdmins };

