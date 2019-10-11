const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const config = require('config');
const User = require('../../models/User');

const router = express.Router();

router.use(
  fileUpload({
    useTempFiles: true
  })
);

cloudinary.config({
  cloud_name: config.get('cloudname'),
  api_key: config.get('cloudKey'),
  api_secret: config.get('cloudSecret')
});

// @route   POST /api/upload
// @desc    Upload a profile picture
// @acess   Private
router.post('/', auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return res.json({ msg: 'Invalid Format' });
  }
  if (file.size > 1000000) {
    return res.json({ msg: 'Image is too large' });
  }
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  if (!result) {
    return res.status(400).json({ msg: 'Something wen wrong' });
  }

  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { avatar: result.url } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
