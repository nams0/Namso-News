const db = require('./db');

function addNews(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { title, content, photo_url, category_name, created_by } = JSON.parse(body);

        const sql = 'INSERT INTO news (title, content, photo_url, category_name, created_by) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [title, content, photo_url, category_name, created_by], (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Database error' }));
            }

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'News added successfully' }));
        });
    });
}

function editNews(req, res) {
    const news_id = req.url.split('/')[3];
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { title, content, photo_url, category_name } = JSON.parse(body);

        const sql = 'UPDATE news SET title=?, content=?, photo_url=?, category_name=? WHERE news_id=?';
        db.query(sql, [title, content, photo_url, category_name, news_id], (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Database error' }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'News updated successfully' }));
        });
    });
}

function deleteNews(req, res) {
    const news_id = req.url.split('/')[3];

    const sql = 'DELETE FROM news WHERE news_id=?';
    db.query(sql, [news_id], (err, result) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Database error' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'News deleted successfully' }));
    });
}

const url = require('url');

function getNewsById(req, res) {
    const news_id = req.url.split('/')[3];

    const sql = 'SELECT * FROM news WHERE news_id=?';
    db.query(sql, [news_id], (err, result) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Database error' }));
        }

        if (result.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'News not found' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result[0]));
    });
}

function getNews(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const categoryParam = parsedUrl.query.category;

    let sql = 'SELECT news.*, admins.admin_name AS admin_name FROM news JOIN admins ON news.created_by = admins.admin_id';
    let params = [];

    if (categoryParam) {
        const categories = categoryParam.split(',').map(cat => cat.trim());
        const placeholders = categories.map(() => '?').join(',');
        sql += ` WHERE category_name IN (${placeholders})`;
        params = categories;
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Database error' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
}

module.exports = { addNews, editNews, deleteNews, getNews, getNewsById };


