const http = require('http');
const url = require('url');
const { loginAdmin } = require('./auth');
const { addNews, editNews, deleteNews, getNews, getNewsById } = require('./news');
const { getAdmins } = require('./admins');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === '/api/admins/login' && method === 'POST') {
        loginAdmin(req, res);
    } else if (path === '/api/admins' && method === 'GET') {
        getAdmins(req, res);
    } else if (path === '/api/news' && method === 'POST') {
        addNews(req, res);
    } else if (path === '/api/news' && method === 'GET') {
        getNews(req, res);
    } else if (path.startsWith('/api/news/') && method === 'PUT') {
        editNews(req, res);
    } else if (path.startsWith('/api/news/') && method === 'DELETE') {
        deleteNews(req, res);
    } else if (path.startsWith('/api/news/') && method === 'GET') {
        getNewsById(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


