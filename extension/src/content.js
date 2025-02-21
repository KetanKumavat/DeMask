let frameIndex = 0;

// Capture frames and send to backend
function captureFrame() {
    const video = document.querySelector("video");
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg");

    // Send frame to backend
    fetch("http://localhost:3000/save-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frameData, index: frameIndex++ }),
    })
    .then(res => res.json())
    .then(data => console.log("Frame saved:", data.filePath))
    .catch(err => console.error("Error:", err));
}

// Capture frames every second
setInterval(captureFrame, 1000);
