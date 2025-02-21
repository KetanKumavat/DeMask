const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const FRAME_DIR = path.join(__dirname, "frames");

// Ensure the frames directory exists
if (!fs.existsSync(FRAME_DIR)) {
    fs.mkdirSync(FRAME_DIR, { recursive: true });
}

app.use(express.json({ limit: "10mb" })); // Allow large image data
app.use(require("cors")()); // Enable CORS for communication with the extension

// Save frame API
app.post("/save-frame", async (req, res) => {
    try {
        const { image, index } = req.body;
        if (!image) return res.status(400).json({ error: "No image data" });

        // Create a session folder inside frames (e.g., frames/session_123/)
        const sessionFolder = path.join(FRAME_DIR, `session_${Date.now()}`);
        if (!fs.existsSync(sessionFolder)) {
            fs.mkdirSync(sessionFolder, { recursive: true });
        }

        const imgBuffer = Buffer.from(image.split(",")[1], "base64");
        const filePath = path.join(sessionFolder, `frame_${index}.jpg`);

        fs.writeFileSync(filePath, imgBuffer);
        res.json({ success: true, filePath });
    } catch (error) {
        console.error("Error saving frame:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
