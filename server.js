// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML and CSS)
app.use(express.static('public_html'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'contact.html'));
});

app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'blogs.html'));
});

app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'news.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'products.html'));
});

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'apex_consultant'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error);
    } else {
        console.log('Connected to the database');
    }
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { fullName, email, query } = req.body;

    // Insert the form data into the database
    connection.query(
        'INSERT INTO contact_submissions (fullName, email, query) VALUES (?, ?, ?)',
        [fullName, email, query],
        (error, results) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error submitting the form');
            } else {
                res.redirect('/contact?submitted=true');
            }
        }
    );
});

// Route to fetch comments for a given post
app.get('/getComments/:postID', (req, res) => {
    const postID = req.params.postID;
    connection.query('SELECT * FROM comments WHERE post_id = ?', [postID], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Route to add a comment
app.post('/addComment', (req, res) => {
    const { post_id, username, comment_text } = req.body;
    connection.query(
        'INSERT INTO comments (post_id, username, comment_text) VALUES (?, ?, ?)',
        [post_id, username, comment_text],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Comment added successfully!' });
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
