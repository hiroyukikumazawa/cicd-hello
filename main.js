const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const PORT = 3002;
const FRONTEND_URL = "http://localhost:3002";

exports.startServer = async () => {

    // Middleware to enable CORS with dynamic origin support
    app.use(cors({ origin: FRONTEND_URL }))

    // Serve static files from the 'dist' directory
    app.use(express.static(path.join(__dirname, '/dist')));

    // Use built-in middleware for parsing JSON and URL-encoded bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Define routes

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/static/index.html'));
    });

    // Start the HTTP server listening on the specified port
    http.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

if (require.main === module) {
    exports.startServer();
}