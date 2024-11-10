import multer from "multer";

/*
  {
    fieldname: 'photo',
    originalname: 'leo.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'public/img/users',
    filename: 'c96c4a362e17567d5597de2ae5019acd'
  }
*/
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    // we will parse the file original name
    // the first argument is an error, if there is no error, we will parse null
    callback(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
