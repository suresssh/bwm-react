const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental')


router.get('', function (req, res) {
    Rentals.find({}, function (err, foundedRentals) {
        if (err) return console.error(err);
        res.json(foundedRentals);
    })
})

router.get('/:id', function (req, res) {
    const _id = req.params.id;
    Rentals.findById(_id, function (err, foundedRentals) {
        if (err) {
            res.status(422).send({ errors: [{ title: "Rental Error", detail: "not found" }] });
        }
        res.json(foundedRentals);
    })
})


module.exports = router;