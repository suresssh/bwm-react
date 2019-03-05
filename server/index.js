const FakeDb = require('./fake-db');
const express = require('express');
const mongoose = require('mongoose');
const mongoUrl = require('./config').DB_URI;
const bodyParser = require('body-parser');
const app = express();
const getRentals = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings')

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(function () {
        console.log('Successfully connected to database');
        // fakeDb = new FakeDb();
        // fakeDb.seedDb();
    }, function (err) {
        console.log('Not connected to database ' + err);
    });



app.use(bodyParser.json());
app.use('/api/v1/rentals', getRentals);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('I am running in server')
})
