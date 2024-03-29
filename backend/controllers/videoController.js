const Video = require('../models/video');

async function getVideoByName(req, res) {
  try {
    const videoName = req.params.name;

    const video = await Video.findOne({ name: videoName });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.contentType('video/mp4').end(video.video, 'binary');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllVideoNames(req, res) {
  try {
    const videoNames = await Video.find({}, 'name');

    if (!videoNames || videoNames.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const names = videoNames.map((video) => video.name);

    res.json(names);
  } catch (error) {
    console.error('Error fetching all video names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getVideoByName,
  getAllVideoNames
};
