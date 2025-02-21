let frameIndex = 0;
let isCapturing = false;
let captureInterval;

// Listen for messages from the popup (or other parts of the extension)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "START_CAPTURE") {
        isCapturing = true;
        startCapture();
    } else if (message.type === "STOP_CAPTURE") {
        isCapturing = false;
        if (captureInterval) {
            clearInterval(captureInterval);
        }
    }
});

function startCapture() {
    captureInterval = setInterval(() => {
        if (!isCapturing) return;

        const video = document.querySelector("video");
        if (!video || video.readyState < 2) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the frame to a JPEG data URL
        const frameData = canvas.toDataURL("image/jpeg");

        // Send the frame data to the background script for processing
        chrome.runtime.sendMessage({ type: "CAPTURE_FRAME", image: frameData });

        frameIndex++;
    }, 1000);
}
