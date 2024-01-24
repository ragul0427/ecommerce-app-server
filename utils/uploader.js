const multer = require("multer");

const ImageUploader = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Image File is accepted."), false);
    }
  },

  limits: {
    fileSize: 10 * 1024 * 1024, // Corrected property name to fileSize
  },

  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const suffix = Date.now() + "-" + `${Math.random().toString().substring(2)}`; // Corrected Math.random() call
      return cb(null, suffix + "-" + file.originalname);
    },
  }),
});

const uploaders = {
  ImageUploader,
};

module.exports = {
  uploaders,
};
