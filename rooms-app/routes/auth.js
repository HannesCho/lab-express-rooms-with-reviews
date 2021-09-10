const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/userRooms',
	failureRedirect: '/login',
	passReqToCallback: true
}));

router.post('/signup', (req, res, next) => {
	console.log(req.body);
	const { username, password } = req.body;
	if (password.length < 5) {
		res.render('signup', { message: 'Your password has to be 8 chars min' });
		return;
	}
	if (username.length === 0) {
		res.render('signup', { message: 'Your username cannot be empty' });
		return;
	}
	User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB !== null) {
				res.render('signup', { message: 'This username is already taken' });
				return;
			} else {
				const salt = bcrypt.genSaltSync();
				const hash = bcrypt.hashSync(password, salt);
				console.log(hash);
				User.create({ fullName: username, password: hash })
					.then(createdUser => {
						console.log(createdUser);
						res.redirect('/login');
					})
					.catch(err => {
						next(err);
					})
			}
		})
});

module.exports = router;