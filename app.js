require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename : (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage : storage});

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single('image'), (req, res) => {
    res.render("uploaded");
});
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
