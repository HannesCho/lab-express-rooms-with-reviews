const router = require("express").Router();
const Room = require('../models/Room');
const { loginCheck } = require('./middlewares');


router.get('/add', (req, res, next) => {
	res.render('add');
});

router.post('/add', loginCheck(), (req, res, next) => {
	const { name, description, imageUrl } = req.body;
	// node-basic-auth req.session.user
	console.log(req.session.user);
	Room.create({
		name: name,
		description: description,
        imageUrl: imageUrl,
		owner: req.user._id
	})
		.then(() => {
			res.redirect('/');
		})
		.catch(err => next(err));
});

router.get('/:id/delete', (req, res, next) => {
	// an admin can delete any room
	// a user can only delete rooms that they created
	const roomId = req.params.id;
	const query = { _id: roomId } // {_id: 23}	
	if (req.user.role !== 'admin') {
		query.owner = req.user._id
	} // {_id: 23, owner: 42}
	Room.findOneAndDelete(query)
		.then(() => {
            res.redirect('/userRooms')
        })
		.catch(err => next(err));
});

module.exports = router;