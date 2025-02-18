require("dotenv").config();
const express = require("express");
const routes= require('./routes/main')
const cors = require('cors');
const dotenv = require('dotenv');
const app = express(); 
app.use(express.json()); 
const port = 3000;

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT"],
    credentials: true
}));


dotenv.config();
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
