const multer = require("multer");
const express = require('express');
const { getText } = require("../controller/getTextController");
const { welcome } = require("../controller/welcome");
const { detectMedicines } = require("../controller/gemini");
const { sendOtp, verifyOtp} = require("../controller/otpController");
const { getImageUrl } = require("../controller/addImageController");
const { putData } = require("../controller/addDataController");


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/extract-text", upload.single("image"), getText);
router.post("/trying", detectMedicines)
router.post("/send-otp",sendOtp   );
router.post("/verify-otp", verifyOtp);
router.post("/add-data", putData)
router.post('/get-image-link', upload.single('file'), getImageUrl);
router.get('/', welcome)
module.exports = router;