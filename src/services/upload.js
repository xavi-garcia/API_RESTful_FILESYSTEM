const multer = require('multer');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,__dirname+ '/../public/img')
    },
    filename:function(req, file, cb){
        cb(null,Date.now()+"-"+ file.originalname)
    }
})

const uploader = multer({storage:storage});

module.exports = uploader;