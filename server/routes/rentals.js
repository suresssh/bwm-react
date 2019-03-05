const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental');
const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
    return res.json({ secret: true });
})


router.get('', function (req, res) {
    Rentals.find({})
        .select('-bookings')
        .exec(function (err, foundRental) {
            if (err) return console.error(err);
            return res.json(foundRental);
        })
})

router.get('/:id', function (req, res) {
    const rentalId = req.params.id;

    Rentals.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function (err, foundRental) {

            if (err || !foundRental) {
                return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }

            return res.json(foundRental);
        });
});


module.exports = router;