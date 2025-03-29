const db = require('./db');

function loginAdmin(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { email, password } = JSON.parse(body);

        const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
        db.query(sql, [email, password], (err, results) => {
            if (err || results.length === 0) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid credentials' }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful', admin_id: results[0].admin_id }));
        });
    });
}

module.exports = { loginAdmin };

