const util = require("util");
const multer = require("multer");
const maxSize = 2 * 5024 * 5024;
var localStorage = require("localStorage");
var imagename = Math.random();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/uploads/");
    console.log(__dirname);
  },
  filename: (req, file, cb) => {
    localStorage.setItem("imagename", imagename);
    cb(null, imagename + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
