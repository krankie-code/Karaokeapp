const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'my-project-images',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  filename:function(req,file,cb){
    cb(null,file.originalname);
  },
  transformation: [{ width: 500, height: 500, crop: 'limit' }]

});

const parser = multer({ storage: storage });

module.exports = parser;