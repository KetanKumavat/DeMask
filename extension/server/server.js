const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const app = express();
const PORT = 3001;
const FRAME_DIR = path.join(__dirname, "frames");

// Create base directory if not exists
if (!fs.existsSync(FRAME_DIR)) fs.mkdirSync(FRAME_DIR, { recursive: true });

let activeSession = null;
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

app.post("/save-frame", async (req, res) => {
    try {
        const { image } = req.body; // Expecting image as Blob
        if (!image) return res.status(400).json({ error: "No image data" });

        if (!activeSession) {
            activeSession = generateSessionFolder();
            frameCount = 0;
        }

        if (frameCount >= MAX_FRAMES) {
            return res.json({
                success: false,
                reason: "Frame limit reached, stopping capture",
            });
        }

        frameCount++;

        // Convert Base64 to Buffer
        const imgBuffer = Buffer.from(image.split(",")[1], "base64");

        // Compress and save the image using sharp
        const filePath = path.join(activeSession, `frame_${frameCount}.jpg`);
        await sharp(imgBuffer)
            .resize(640, 360, { fit: "inside" }) // Resize to optimize
            .jpeg({ quality: 75 }) // Compress image
            .toFile(filePath);

        res.json({ success: true, filePath });
    } catch (error) {
        console.error("Error saving frame:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Reset session after inactivity
setInterval(() => {
    activeSession = null;
    frameCount = 0;
}, 10 * 60 * 1000); // Reset every 10 minutes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
