const router = require("express").Router();
const Room = require('../models/Room');
const { loginCheck } = require('./middlewares');


router.get('/', (req, res, next) => {
	Room.find()
		.then(rooms => res.render('index', { roomList: rooms }))
		.catch(err => next(err))
});

