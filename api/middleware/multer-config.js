// middleware/multer-config.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, "api/uploads")
  },
  filename: function (req, file, cb){
    return cb(null, Date.now() + path.extname(file.originalname))
  }

})

const upload = multer({storage})

module.exports = upload;
