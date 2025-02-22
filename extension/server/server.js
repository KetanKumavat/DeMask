const WebSocket = require("ws");
const express = require("express");
const crypto = require("crypto");
const sharp = require("sharp");

const app = express();
const PORT = 3001;
const WS_URL = "wss://2e62-123-252-147-173.ngrok-free.app/ml/ws"; 

let ws;
function connectWebSocket() {
    ws = new WebSocket(WS_URL);

    ws.on("open", () => console.log("Connected to WebSocket Server"));
    ws.on("error", (err) => console.error("WebSocket Error:", err));
    ws.on("close", () => {
        console.log("WebSocket Disconnected. Reconnecting...");
        setTimeout(connectWebSocket, 3000);
    });

    ws.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            if (message.score) {
                console.log(`Received accuracy: ${message.score}`);
            } else {
                console.log("Received WebSocket message:", message);
            }
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    });

    ws.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            console.log(message.result);
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    });

    ws.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            console.log(message.final_result);
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    });
}

// Connect WebSocket on startup
connectWebSocket();

app.use(express.json({ limit: "10mb" }));

// function generateHash(input) {
//     return crypto.createHash("sha256").update(input).digest("hex");
// }

app.post("/save-frame", async (req, res) => {
    try {
        const { image, timestamp, videoLink, videoHash } = req.body;
        if (!image || !timestamp || !videoLink || !videoHash) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Convert Base64 to Buffer
        const imgBuffer = Buffer.from(image.split(",")[1], "base64");

        // Compress and resize the image using sharp
        // const compressedBuffer = await sharp(imgBuffer)
        //     .resize(640, 360) // Resize to 640x360
        //     .jpeg({ quality: 75 }) // Compress with 75% quality
        //     .toBuffer();

        // Generate SHA-256 hash for the frame
        // const frameHash = generateHash(imgBuffer);

        // Send over WebSocket
        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log("Sending data over WebSocket:", {
            // videoHash, 
            // frameHash, 
            videoLink, 
            timestamp 
            });
            ws.send(JSON.stringify({ 
            // videoHash, 
            // frameHash, 
            videoLink, 
            timestamp 
            }));
            ws.send(imgBuffer); 
            return res.json({ success: true, videoHash });
        } else {
            return res.status(500).json({ error: "WebSocket not connected" });
        }
    } catch (error) {
        console.error("Error processing frame:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
