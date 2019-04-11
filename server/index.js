const FakeDb = require('./fake-db');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const app = express();
const getRentals = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings')
const path = require('path');

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(function () {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Successfully connected to database');
            const fakeDb = new FakeDb();
            // fakeDb.seedDb();
        }
    }, function (err) {
        console.log('Not connected to database ' + err);
    });



app.use(bodyParser.json());
app.use('/api/v1/rentals', getRentals);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

// const appPath = path.join(__dirname, '..', 'build');
// app.use(express.static(appPath));

// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(appPath, 'index.html'));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('I am running in server')
})
