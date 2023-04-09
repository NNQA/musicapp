import { NextApiRequest, NextApiResponse } from "next";
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



// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
export default function handle(req: NextApiRequest, res: NextApiResponse) {
    console.log('dsasd')
    if(req.method === 'POST') {
        console.log(req.body)
    }
}