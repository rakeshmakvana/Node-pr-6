const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const router = require('./routes/authRoutes')
const db = require('./configration/dbCon');
const PORT = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server running in http://localhost:${PORT}`);
    } else {
        console.log('Err', err);
    };
});