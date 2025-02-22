let frameIndex = 0;
let isCapturing = false;
let captureInterval;
let currentVideoHash = null;

let activeVideos = new Set();

// Detect new videos and trigger processing
const observer = new MutationObserver(() => {
    const video = document.querySelector("video");
    console.log(video)
    if (video && video.readyState >= 2) {
        checkAndProcessVideo(video);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "START_CAPTURE") {
        isCapturing = true;
        if (activeVideos.size > 0) {
            startCapture();
        }
    } else if (message.type === "STOP_CAPTURE") {
        isCapturing = false;
        if (captureInterval) {
            clearInterval(captureInterval);
        }
    } else if (message.type === "DEEPFAKE_RESULT") {
        applyOverlayIfFake(message.data, video);
    }
});

// Function to generate a hash for a video
function generateVideoHash(video) {
    return `${video.src}-${video.videoWidth}x${video.videoHeight}-${Math.floor(video.duration)}`;
}

function checkAndProcessVideo(video) {
    if (!video || !video.src || video.readyState < 2) return;

    const videoHash = generateVideoHash(video);

    chrome.storage.local.get("processedVideos", (data) => {
        let processedVideos = data.processedVideos || {};

        if (!processedVideos[videoHash]) {
            console.log("New video detected, processing...");
            processedVideos[videoHash] = true;
            chrome.storage.local.set({ processedVideos });

            startCapture(video, videoHash);
        }
    });
}

function startCapture(video, videoHash) {
    if (!video) return;

    captureInterval = setInterval(() => {
        if (!isCapturing) return;

        if (!video || video.readyState < 2) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameData = canvas.toDataURL("image/jpeg");
        const timestamp = video.currentTime.toFixed(1); // Capture the frame's timestamp with one decimal

        chrome.runtime.sendMessage({
            type: "CAPTURE_FRAME",
            image: frameData,
            timestamp,
            videoLink: video.src,
            videoHash,
        });

        frameIndex++;

        chrome.storage.local.get("frameCount", (result) => {
            let newFrameCount = (result.frameCount || 0) + 1;
            chrome.storage.local.set({ frameCount: newFrameCount });
        });
    }, 3000);
}

function applyOverlayIfFake(finalResult, video) {
    if (finalResult !== "Fake") return;

    // const video = document.querySelector("video");
    // console.log(video)
    if (!video) return;

    let overlay = document.querySelector("#video-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "video-overlay";
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.color = "white";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.fontSize = "20px";
        overlay.style.fontWeight = "bold";
        overlay.style.zIndex = "9999";
        overlay.innerText = "⚠️ Deepfake Detected!";
        video.parentElement.style.position = "relative";
        video.parentElement.appendChild(overlay);
    }
}

observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener(
    "play",
    (event) => {
        if (event.target.tagName === "VIDEO") {
            isCapturing = true;
            chrome.runtime.sendMessage({ type: "START_CAPTURE" });
            checkAndProcessVideo(event.target);
        }
    },
    true
);

document.addEventListener(
    "pause",
    (event) => {
        if (event.target.tagName === "VIDEO") {
            isCapturing = false;
            clearInterval(captureInterval);
            chrome.runtime.sendMessage({ type: "STOP_CAPTURE" });
            console.log("Video paused, stopping capture...");
        }
    },
    true
);