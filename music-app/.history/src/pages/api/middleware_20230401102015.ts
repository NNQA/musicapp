import formidable from 'formidable';
import nextConnect from 'next-connect';

const form = formidable({ multiples: true }); // uploaded files will be an array

// Middleware
async function middleware(req, res, next) {
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

// Handler
const handler = nextConnect({})
  .use(parseMultipartForm)
  .post((req, res) => {
    // req.files will be an array of files
    // Do something with the files
  });

export default handler;