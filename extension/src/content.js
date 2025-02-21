let frameIndex = 0;
let isCapturing = false;
let captureInterval;
let currentVideoHash = null;

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

// Function to generate a hash for a video
function generateVideoHash(video) {
    return `${video.src}-${video.videoWidth}x${video.videoHeight}-${Math.floor(video.duration)}`;
}

// Function to check if the video is new and trigger overlay/model
function checkAndProcessVideo(video) {
    if (!video || !video.src || video.readyState < 2) return;

    const newVideoHash = generateVideoHash(video);

    chrome.storage.local.get("processedVideos", (data) => {
        let processedVideos = data.processedVideos || {};

        if (!processedVideos[newVideoHash]) {
            console.log("New video detected, processing...");
            processedVideos[newVideoHash] = true; // Mark as processed
            chrome.storage.local.set({ processedVideos });

            // Start frame capturing for this video
            startCapture(video);
        }
    });
}

function startCapture(video) {
    if (!video) return;

    captureInterval = setInterval(() => {
        if (!isCapturing) return;

        if (!video || video.readyState < 2) return;

        let overlay = document.querySelector("#video-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "video-overlay";
            overlay.style.position = "absolute";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black
            overlay.style.color = "white";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.fontSize = "20px";
            overlay.style.fontWeight = "bold";
            overlay.style.zIndex = "9999";
            overlay.innerText = "Capturing Frames...";
            video.parentElement.style.position = "relative";
            video.parentElement.appendChild(overlay);
        }

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameData = canvas.toDataURL("image/jpeg");
        chrome.runtime.sendMessage({ type: "CAPTURE_FRAME", image: frameData });

        frameIndex++;
    }, 3000);
}

// Detect new videos and trigger processing
const observer = new MutationObserver(() => {
    const video = document.querySelector("video");
    if (video && video.readyState >= 2) {
        checkAndProcessVideo(video);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("play", (event) => {
    if (event.target.tagName === "VIDEO") {
        isCapturing = true;
        checkAndProcessVideo(event.target);
    }
}, true);

document.addEventListener("pause", (event) => {
    if (event.target.tagName === "VIDEO") {
        isCapturing = false;
        clearInterval(captureInterval);
        console.log("Video paused, stopping capture...");
    }
}, true);

