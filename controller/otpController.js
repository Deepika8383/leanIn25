const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {OTP} = require("../services/database/mongoDb")

const sendOtp= async (req, res) => {
    const { email } = req.body;
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set the OTP expiration time to 5 minutes
    const expiresAt = Date.now() + 10 * 60 * 1000;

    try {
        const newOTP = new OTP({ email, otp, expiresAt });
        await newOTP.save();
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jaindeepika8383@gmail.com',
                pass: 'adgt vwru cfpj wgcj',
            },
        });
        const mailOptions = {
            from: 'jaindeepika8383@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending OTP email', error });
            }
            res.status(200).json({ message: 'OTP sent successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating or storing OTP', error });
    }
};
const verifyOtp=  async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        if (otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        try {
            await OTP.deleteOne({ _id: otpRecord._id });
        } catch (error) {
            console.error("Error deleting OTP record:", error);
            return res.status(500).json({ message: 'Error deleting OTP record' });
        }
        
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    sendOtp,
    verifyOtp
};