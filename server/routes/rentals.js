const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental');
const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
    return res.json({ secret: true });
})


router.get('', function (req, res) {
    Rentals.find({}, function (err, foundedRentals) {
        if (err) return console.error(err);
        return res.json(foundedRentals);
    })
})

router.get('/:id', function (req, res) {
    const _id = req.params.id;
    Rentals.findById(_id, function (err, foundedRentals) {
        if (err) {
            res.status(422).send({ errors: [{ title: "Rental Error", detail: "not found" }] });
        }
        return res.json(foundedRentals);
    })
})


module.exports = router;