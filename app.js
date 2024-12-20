const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "uploads")));

// File upload route
app.post("/upload", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const uploadPath = path.join(__dirname, "uploads", file.name);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("File uploaded successfully!");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
