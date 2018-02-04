const router = require('express').Router();

const Video = require('../models/video');

/* NOTE: Send a basic response using: 
router.post('/create', async (req, res, next) => {
  res.status(201).send();
});*/

router.post('/videos/create', async (req, res, next) => {
  const {title, description} = req.body;
  const newVideo = await Video.create({title, description});
  newVideo.validateSync();
  if (!newVideo.errors) {
    await newVideo.save();
    res.redirect('/');
  }

});

module.exports = router;