const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dgmss9oy4",
    api_key: "471463573585662",
    api_secret: "m8A6vv5mTqg7bBW-uY-E0S3gYy0"
});

module.exports = cloudinary;

// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,