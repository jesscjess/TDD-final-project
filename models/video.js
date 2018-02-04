const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Video',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: 'Path `title` is required.'
    },
    description: {
      type: String,
      required: 'Path `description` is required.'
    }
  })
);
