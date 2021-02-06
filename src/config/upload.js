const multer = require('multer');
const path = require("path");

module.exports = {
    storage: multer.diskStorage({
        //the first .. we go out of config the other .. get us out of src then to files directory
        destination: path.resolve(__dirname, "..", "..", "files"),
        //the function will take req , file , callback function 
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)

            cb(null, `${name.replace(/\s/g, "")}-${Date.now()}${ext}`)
        }

    })
}