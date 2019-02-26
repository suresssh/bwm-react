const UserModel = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function (req, res) {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(422).send({ title: "Data Missing!", message: "Provide Email and Password!" })

    UserModel.findOne({ email }, function (err, user) {
        if (err)
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        if (!user)
            return res.status(422).send({ errors: { title: 'Invalid User!', detail: "User does not exist." } })
        if (user.isSamePassword(password)) {

            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET_KEY, { expiresIn: '1h' });

            return res.json(token)
        }
        else {
            return res.status(422).send({ errors: { title: 'Invalid data!', detail: "Invalid email or password!" } })
        }

    })

}

exports.register = function (req, res) {
    const { username, password, email, passwordConfirmation } = req.body;

    if (!password || !email) {
        return res.status(422).send({ errors: { title: 'Data Missing', detail: 'Please Provide email and password!' } })
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: { title: 'Invalid password ', detail: "Password and Confirm password doesn`t match!" } })
    }

    UserModel.findOne({ email }, function (err, existingUser) {
        if (err)
            return res.status(422).send({ errors: [{ title: 'mongoose', detail: 'handle mongoose error in next session!' }] });
        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Existing user', detail: 'User exists already with email id!' }] });
        }

        const user = new UserModel({
            username,
            email,
            password
        })

        user.save(function (err, userInserted) {
            if (err)
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            if (userInserted)
                return res.json({ 'register': userInserted, 'registered': true });
        })

    })
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        UserModel.findById(user.userId, function (err, user) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET_KEY);
}

function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not authorized!', detail: 'You need to login to get access!' }] });
}