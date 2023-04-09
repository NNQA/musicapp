import formidable from "formidable";
import PersistentFile from "formidable/PersistentFile";
import { NextApiRequest, NextApiResponse } from "next";
import { AiOutlineConsoleSql } from "react-icons/ai";
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
    cloud_name: "dgmss9oy4",
    api_key: "471463573585662",
    api_secret: "m8A6vv5mTqg7bBW-uY-E0S3gYy0"
});


// Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', { public_id: "olympic_flag" })

// res.then((data: any) => {
//     console.log(data);
//     console.log(data.secure_url);
// }).catch((err: any) => {
//     console.log(err);
// });


// Generate 
// const url = cloudinary.url("olympic_flag", {
//     width: 100,
//     height: 150,
//     Crop: 'fill'
// });
const form = formidable({ multiples: true }); // uploaded files will be an array
export async function middleware(req, res, next) {
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
      form.parse(req, (err, fields, files) => {
        if (!err) {
          req.body = fields;
          req.files = files;
        }
        next();
      });
    } else {
      next();
    }
  }
  
  // Disable NextJS body parsing
  export const config = {
    api: {
      bodyParser: false,
    },
  };


// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        form.parse(req, (err, fields, files) => {
            if (!err) {
                const file = files.file as File;
                file.
            }
          });
    }
}