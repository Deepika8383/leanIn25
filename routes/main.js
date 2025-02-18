const multer = require("multer");
const express = require('express');
const { getText } = require("../controller/getTextController");


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/extract-text", upload.single("image"), getText);

module.exports = router;