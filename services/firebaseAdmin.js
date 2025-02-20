const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Ensure this file is in your project root

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
