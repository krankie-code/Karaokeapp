const cloudinary = require('cloudinary').v2;
const {
  CloudinaryStorage
} = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'audio-files',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp3', 'wav'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  transformation: [{
    width: 125,
    height: 125,
    crop: 'limit'
  }]

});

const parser = multer({
  storage: storage
});

module.exports = parser;