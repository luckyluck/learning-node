require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }));
    const mailOptions = {
        to: process.env.EMAIL,
        from: email,
        subject: 'Website Submission',
        text: `You have  submission with the following details... Name: ${name}, Email: ${email}, Message: ${message}`,
        html: `<p>You have  submission with the following details...</p>
                <ul>
                    <li>${name}</li>
                    <li>${email}</li>
                    <li>${message}</li>
                </ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent:', info.response);
        }
        transporter.close();
        res.redirect('/');
    });
});

app.listen(3000);
console.log('Server is running on the port 3000');
