let frameIndex = 0;
let stopCapture = false;

function captureFrame() {
    if (stopCapture) return;
    
    const video = document.querySelector("video");
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg");

    fetch("http://localhost:3000/save-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frameData }),
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            console.log("Stopping capture:", data.reason);
            stopCapture = true;
        }
    })
    .catch(err => console.error("Error:", err));

    frameIndex++;
}

// Start capturing
setInterval(captureFrame, 1000);
