const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const FRAME_DIR = path.join(__dirname, "frames");

// Create base directory if not exists
if (!fs.existsSync(FRAME_DIR)) fs.mkdirSync(FRAME_DIR, { recursive: true });

let activeSession = null;
let lastHash = null; // Used to detect looping
let frameCount = 0;
const MAX_FRAMES = 500; // Stop if too many frames

app.use(express.json({ limit: "10mb" })); // Support large payloads
app.use(require("cors")({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Frame Extractor Server");
});

function generateSessionFolder() {
    const sessionFolder = path.join(FRAME_DIR, `session_${Date.now()}`);
    fs.mkdirSync(sessionFolder, { recursive: true });
    return sessionFolder;
}

function getImageHash(base64Image) {
    return base64Image.slice(0, 100); // Extract a portion of the data to compare
}

app.post("/save-frame", async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).json({ error: "No image data" });

        if (!activeSession) {
            activeSession = generateSessionFolder();
            frameCount = 0;
            lastHash = null; // Reset loop detection
        }

        // const imgHash = getImageHash(image);

        // **Check for looping only after the first frame**
        // if (lastHash !== null && imgHash === lastHash) {
        //     return res.json({ success: false, reason: "Loop detected, stopping capture" });
        // }

        if (frameCount >= MAX_FRAMES) {
            return res.json({
                success: false,
                reason: "Frame limit reached, stopping capture",
            });
        }

        // lastHash = imgHash; // Update last hash
        frameCount++;

        const imgBuffer = Buffer.from(image.split(",")[1], "base64");
        const filePath = path.join(activeSession, `frame_${frameCount}.jpg`);
        fs.writeFileSync(filePath, imgBuffer);

        res.json({ success: true, filePath });
    } catch (error) {
        console.error("Error saving frame:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Reset session after inactivity
setInterval(() => {
    activeSession = null;
    lastHash = null;
    frameCount = 0;
}, 10 * 60 * 1000); // Reset every 10 minutes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
