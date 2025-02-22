const WebSocket = require("ws");
const express = require("express");
const sharp = require("sharp");

const app = express();
const PORT = 3001;
const WS_URL = "wss://192e-123-252-147-173.ngrok-free.app/ml/ws"; // Your WebSocket URL

let ws;
function connectWebSocket() {
    ws = new WebSocket(WS_URL);

    ws.on("open", () => {
        console.log("Connected to WebSocket Server");
    });

    ws.on("error", (err) => {
        console.error("WebSocket Error:", err);
    });

    ws.on("close", () => {
        console.log("WebSocket Disconnected. Reconnecting...");
        setTimeout(connectWebSocket, 3000);
    });
}

// Connect WebSocket on startup
connectWebSocket();

app.use(express.json({ limit: "10mb" }));

app.post("/save-frame", async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).json({ error: "No image data" });

        // Convert Base64 to Buffer
        const imgBuffer = Buffer.from(image.split(",")[1], "base64");

        // Compress and resize using sharp
        const compressedBuffer = await sharp(imgBuffer)
            .resize(640, 360)
            .jpeg({ quality: 75 })
            .toBuffer();
        console.log(ws.readyState)
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(compressedBuffer);
            console.log(compressedBuffer)
            return res.json({ success: true });
        } else {
            return res.status(500).json({ error: "WebSocket not connected" });
        }
    } catch (error) {
        console.error("Error sending frame:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
