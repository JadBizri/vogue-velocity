//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');
const mongoose = require('mongoose');
const model = require('./models/item');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
const url = 'mongodb+srv://jadb:jadb123@project3.1gd4hzw.mongodb.net/nbda-project3';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url)
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    }).catch((err) => { console.log(err.message); })

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up route
app.get('/', (req, res, next) => {
    // Call the findRandom method on your Mongoose model
    model.findRandom()
        .then(item => {
            // Render the item/show view
            res.render('index', { item });
        })
        .catch(err => next(err));
});

app.use('/items', itemRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = 'Internal Server Error';
    }
    res.status(err.status);
    res.render('error', { error: err });
});
