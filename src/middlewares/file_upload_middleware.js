import multer from "multer";

const storageConfiq = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resume");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({ storage: storageConfiq });
