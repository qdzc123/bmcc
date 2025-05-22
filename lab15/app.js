const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'student', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set!');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username stored in cookie: ${username}`);
});

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie deleted');
});

app.get('/login', (req, res) => {
    req.session.user = { username: 'student' };
    res.send('You are logged in');
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}`);
    } else {
        res.send('Please log in first');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.send('You have logged out');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
