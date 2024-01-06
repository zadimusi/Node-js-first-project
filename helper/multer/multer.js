const multer = require("multer");
const path = require("path");
// checking for file type
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

// Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
      const uploadPath = path.join(__dirname, '../../storage/uploads/');
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extension = MIME_TYPES[file.mimetype];
        if (!extension) {
            return cb(new Error('Invalid file type'));
        }
        const fileName = new Date().toISOString().replace(/:/g, '-') + '.' + extension;
        cb(null, fileName);
    }
});

module.exports = multer({
    storage
})