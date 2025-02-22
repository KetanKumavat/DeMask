chrome.runtime.onInstalled.addListener(() => {
    console.log("Auto Frame Extractor Installed!");
    chrome.storage.local.set({
        isEnabled: false,
        frameCount: 0,
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Extension Started");
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "CAPTURE_FRAME") {
        try {
            const { image, timestamp, videoLink, videoHash } = message;

            if (!image || !timestamp || !videoLink || !videoHash) {
                sendResponse({ type: "CAPTURE_ERROR", error: "Missing required fields" });
                return;
            }

            const response = await fetch("http://localhost:3001/save-frame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image, timestamp, videoLink, videoHash }),
            });

            const data = await response.json();

            if (data.success) {
                sendResponse({ type: "FRAME_CAPTURED", videoHash, frameHash: data.frameHash });
            } else {
                sendResponse({ type: "CAPTURE_ERROR", error: data.reason });
            }
        } catch (error) {
            sendResponse({ type: "CAPTURE_ERROR", error: error.message });
        }
        return true; // Keeps the response channel open for async response
    }
});
