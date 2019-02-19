const express = require('express');
const mongoose = require('mongoose');
const mongoUrl = require('./config').DB_URI;

// const mongoUrl = "mongodb://localhost:27017/MiQube";

mongoose.connect(mongoUrl, { useNewUrlPaÎrser: true })
    .then(function () {
        //connected successfully
        console.log('Successfully connected to database');
    }, function (err) {
        //err handle
        console.log('Not connected to database ' + err);
    });

var inventSchema = new mongoose.Schema({
    item: { type: String },
});

var invent = mongoose.model('inventories', inventSchema);

var newInv = new invent({
    item: "Transport"
})

// newInv.save(function (err) { if (err) console.log('Error on save!') });



const app = express()
app.get('/rentals', function (req, res) {
    invent.find({}, function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log('I am running in server')
})
