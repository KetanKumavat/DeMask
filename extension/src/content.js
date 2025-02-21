let frameIndex = 0;

// Function to save frames to storage
async function saveFrame(base64Data, index) {
    try {
        const byteString = atob(base64Data.split(",")[1]);
        const buffer = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            buffer[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: "image/jpeg" });

        // Convert blob to ArrayBuffer
        const arrayBuffer = await blob.arrayBuffer();

        // Store image in Chrome storage (or a system directory if permissions allow)
        chrome.storage.local.set({ [`frame_${index}`]: arrayBuffer }, () => {
            console.log(`Saved frame_${index}.jpg in storage`);
        });
    } catch (err) {
        console.error("Failed to save frame:", err);
    }
}

// Function to capture frames
function captureFrame(index) {
    const video = document.querySelector("video");
    if (!video) {
        console.error("No video element found.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (video.readyState >= 2) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = canvas.toDataURL("image/jpeg");

        saveFrame(frameData, index);
    }
}

// Start capturing frames every second
setInterval(() => {
    captureFrame(frameIndex++);
}, 1000);

console.log("Frame Capture Script Activated!");
