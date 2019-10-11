const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const config = require('config');
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

router.post('/', (req, res) => {
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
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log('Error: ' + err);
    res.json(result);
  });
});

module.exports = router;
