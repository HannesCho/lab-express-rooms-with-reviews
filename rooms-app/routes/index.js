const router = require("express").Router();
const { loginCheck } = require('./middlewares');
const Room = require('../models/Room');

/* GET home page */
//show all the rooms
router.get("/", (req, res, next) => {
  Room.find()
  .then(rooms => res.render('index', { roomList: rooms }))
  .catch(err => next(err))
});

router.get('/userRooms', loginCheck(), (req, res, next) => {
  // using node-basic-auth: req.session.user
  const loggedInUser = req.user;
  Room.find({ owner: req.user._id})
    .then(rooms => {
      console.log(rooms);
      res.render('userRooms', { user: loggedInUser, roomList: rooms })
    })
    .catch(err => next(err))
});

module.exports = router;
