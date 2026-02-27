const multer = require('multer');
const path = require('path');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if (isValid) {
            uploadError = null;
        }

        cb(uploadError, path.join(__dirname, '../uploads'));
    },

    filename: function (req, file, cb) {

        const extension = FILE_TYPE_MAP[file.mimetype];

        cb(null, Date.now() + '.' + extension);
    }
});

const Upload = multer({ storage: storage });

module.exports = Upload;

// const multer = require('multer');

// const path = require('path');


// const FILE_TYPE_MAP={
//     'image/png':'png',
//     'image/jpeg':'jpeg',
//     'image/jpg':'jpg',
//     'image/gif':'gif',
//     'image/bmp':'bmp',
//     'image/wbep':'wbep'
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//          const isValid=FILE_TYPE_MAP[file.mimetype]
//         let uploadError=new Error('invalid image type')
//         if(isValid){
//             uploadError=null
//         }
//         cb(uploadError,'uploads')
      
//     },
//     filename: function (req, file, cb) {
//         const fileName=file.originalname.split(' ').join('-')
//         const extension=FILE_TYPE_MAP[file.mimetype]
//        cb(null, Date.now() + '.' + extension);
//     }
// })



// const Upload= multer({storage: storage});

// module.exports=Upload