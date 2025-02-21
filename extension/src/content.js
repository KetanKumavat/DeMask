let frameIndex = 0;
let isCapturing = false;
let captureInterval;

// Listen for messages from popup
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
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameData = canvas.toDataURL("image/jpeg");

        fetch("https://63hkpqrh-3000.inc1.devtunnels.ms/save-frame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: frameData }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    chrome.runtime.sendMessage({ type: "FRAME_CAPTURED" });
                } else {
                    chrome.runtime.sendMessage({
                        type: "CAPTURE_ERROR",
                        error: data.reason,
                    });
                    isCapturing = false;
                    clearInterval(captureInterval);
                }
            })
            .catch((err) => {
                chrome.runtime.sendMessage({
                    type: "CAPTURE_ERROR",
                    error: err.message,
                });
                isCapturing = false;
                clearInterval(captureInterval);
            });

        frameIndex++;
    }, 1000);
}
