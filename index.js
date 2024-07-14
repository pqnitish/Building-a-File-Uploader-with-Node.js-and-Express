const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = 4002;
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });
app.use(express.json());
app.get("/", (req, res) => {
  return res.render("test");
});
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: "file uploaded successfully",
    imageUrl: req.file.path,
  });
});
app.listen(PORT, (req, res) => {
  console.log(`server is ruuning port:${PORT}`);
});
