const axios = require('axios');
require("dotenv").config();
// Hugging Face API Token
const API_TOKEN = process.env.HUGGINGFACE_API_KEY; // Replace with your token

// Medical NER Model Endpoint
const HF_API_URL = "https://api-inference.huggingface.co/models/Clinical-AI-Apollo/Medical-NER";

// Function to analyze medical text
const detectMedicines = async(req, res) =>{
    text=req.body.mess
    try {
        const response = await axios.post(
            HF_API_URL,
            { inputs: text },
            {
                headers: {
                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const filteredEntities = response.data
        .filter(item => item.entity_group === "MEDICATION" && item.score > 0.6)
        .map(item => item.word);

        console.log("Detected Medicines:", filteredEntities);
        return res.json({ medicines: filteredEntities });
    } catch (error) {
        return res.json("Error:", error.response ? error.response.data : error.message);
    }
}

// Example Usage
// analyzeMedicalText("Patient was prescribed Paracetamol and Ibuprofen for fever.");


// const axios = require("axios");

// const detectMedicines = async (text) => {
//   try {
//     console.log(process.env.HUGGINGFACE_API_KEY)
//     const response = await axios.post(
//       "https://api-inference.huggingface.co/models/d4data/biobert-medner",  // Medical NER model
//       { inputs: text },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data && Array.isArray(response.data)) {
//       return response.data.map((entity) => entity.word);
//     }
//     return [];
//   } catch (error) {
//     console.error("Hugging Face API error:", error);
//     return [];
//   }
// };

module.exports = { detectMedicines };
