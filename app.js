const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/feed', feedRoutes);



app.listen(5000); 