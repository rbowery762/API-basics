const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const corsOptions = {
    origin: "https://cse341-project-master.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Dragoncat99:Echomoon11@cluster0.ma3ou.mongodb.net/shop?retryWrites=true&w=majority&authSource=admin";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
  };

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

app.use('/', feedRoutes)
    .use((req, res, next) => {
        // 404 page
        res.render('pages/404', {
        title: '404 - Page Not Found', 
        path: req.url,
        isLoggedIn: req.session.loggedIn});
    })
    .use((err, req, res, next) => {
        console.log(err);
        res.render('pages/500', {
        title: '500 - Server Error',
        path: req.url
        })
  });

mongoose
.connect(MONGODB_URL, options)
.then( result => {
    app.listen(PORT); 
})
.catch(err => {
    console.log(err);
})
