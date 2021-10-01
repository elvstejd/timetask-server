const express = require('express');
const router = express.Router();
const User = require('../models/Users');


/* GET specified user provided a uid */
router.get('/:uid', async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(400).json({ message: "No user with that uid" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


/* POST request */
router.post('/', async (req, res) => {
  const user = new User({
    uid: req.body.uid,
    name: req.body.name,
    email: req.body.email
  });
  try {
    await user.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
});

module.exports = router;
