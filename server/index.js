const FakeDb = require('./models/fake-db');
const express = require('express');
const mongoose = require('mongoose');
const mongoUrl = require('./config').DB_URI;
const bodyParser = require('body-parser');
const app = express();
const getRentals = require('./routes/rentals');
const userRoutes = require('./routes/users');



mongoose.connect(mongoUrl, { useNewUrlPaÎrser: true })
    .then(function () {
        console.log('Successfully connected to database');
        fakeDb = new FakeDb();
        fakeDb.initPushRental();
    }, function (err) {
        console.log('Not connected to database ' + err);
    });



app.use(bodyParser.json());
app.use('/api/v1/rentals', getRentals);
app.use('/api/v1/users', userRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('I am running in server')
})
