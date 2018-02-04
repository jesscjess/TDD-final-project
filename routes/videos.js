const router = require('express').Router();

const Video = require('../models/video');

/* NOTE: Send a basic response using: 
router.post('/create', async (req, res, next) => {
  res.status(201).send();
});*/

router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});


router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/videos', { videos });
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos/create', async (req, res, next) => {
  const { title, description } = req.body;
  const newVideo = new Video({ title, description });
  newVideo.validateSync();
  if(newVideo.errors){
    res.status(400).render('videos/create', { video: newVideo })
  } else {
    await newVideo.save()
    res.render('videos/show', { newVideo: newVideo })
  }
});

module.exports = router;