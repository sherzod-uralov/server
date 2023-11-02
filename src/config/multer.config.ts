import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + file.originalname;
      const split = uniqueName.split(' ').join('_');
    cb(null, split);
    }
  })
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg'&& ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{ 
        fileSize: 100000000000000
    }
})

export {upload};