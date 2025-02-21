const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect("mongodb+srv://deepika8383:Harekrishna@cluster0.5m1rpme.mongodb.net/");
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const OTP = mongoose.model('OTP', otpSchema);
const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    medicines: { type: [mongoose.Schema.Types.Mixed] },
    appointments: { type: [mongoose.Schema.Types.Mixed], default: null },
    email: { type: String, default: Date.now }
});
const data = mongoose.model('Data', dataSchema);

module.exports = {
    OTP,
    data
};
