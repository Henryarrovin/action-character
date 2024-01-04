const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: String,
  video: Buffer,
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
