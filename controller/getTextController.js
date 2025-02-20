const { TextractClient, DetectDocumentTextCommand } = require("@aws-sdk/client-textract");
const { detectMedicines } = require("./gemini");
const textractClient = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getText = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const command = new DetectDocumentTextCommand({
      Document: { Bytes: file.buffer },
    });

    const response = await textractClient.send(command);

    const extractedText = response.Blocks
      .filter((block) => block.BlockType === "LINE")
      .map((block) => block.Text)
      .join("\n");
    
      // return res.status(400).json({message : extractedText})
    // Detect medicine names using Gemini API
    const medicineNames = await detectMedicines(extractedText);

    if (medicineNames.length === 0) {
      return res.status(400).json({ error: "Not a valid prescription image" });
    }

    res.json({ prescription: { medications: medicineNames } });
  } catch (error) {
    console.error("Error extracting text:", error);
    res.status(500).json({ error: "Failed to extract text" });
  }
};

// const getText = async (req, res) => {
//   try {
//     const file = req.file; // ✅ Use req.file, not req.image

//     if (!file) { // ✅ Correct condition
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const command = new DetectDocumentTextCommand({
//       Document: { Bytes: file.buffer },
//     });

//     const response = await textractClient.send(command);

//     const extractedText = response.Blocks
//       .filter((block) => block.BlockType === "LINE")
//       .map((block) => block.Text)
//       .join("\n");

//     res.json({ extractedText });
//   } catch (error) {
//     console.error("Error extracting text:", error);
//     res.status(500).json({ error: "Failed to extract text" });
//   }
// };

module.exports = {
  getText,
};
