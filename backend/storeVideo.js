const mongoose = require('mongoose');
const fs = require('fs').promises;

async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/action-character', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const videoSchema = new mongoose.Schema({
      name: String,
      video: Buffer,
    });

    const VideoModel = mongoose.model('Video', videoSchema);

    const videoName = 'Walk';
    const videoBuffer = await fs.readFile('C:/Users/Henry/Desktop/action-character/backend/0001-0030.mkv');

    const newVideo = new VideoModel({ name: videoName, video: videoBuffer });

    await newVideo.save();

    console.log('Video stored in MongoDB');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
