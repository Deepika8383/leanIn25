const multer = require("multer");
const express = require('express');
const { getText } = require("../controller/getTextController");
const { welcome } = require("../controller/welcome");


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/extract-text", upload.single("image"), getText);
router.get('/', welcome)
module.exports = router;