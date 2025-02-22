let ws = new WebSocket("wss://2e62-123-252-147-173.ngrok-free.app/ml/ws"); 
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
ws.onmessage = (event) => {
    try {
        const message = JSON.parse(event.data);
        console.log("Received from WebSocket:", message.final_result);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "DEEPFAKE_RESULT",
                    data: message.final_result,
                });
            }
        });
    } catch (error) {
        console.error("Error parsing WebSocket message:", error);
    }
};


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "CAPTURE_FRAME") {
        try {
            const { image, timestamp, videoLink, videoHash } = message;
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });
            const currentURL = tab.url;
            console.log(currentURL)
            if (!image || !timestamp || !videoLink || !videoHash) {
                sendResponse({ type: "CAPTURE_ERROR", error: "Missing required fields" });
                return;
            }

            const response = await fetch("http://localhost:3001/save-frame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image, timestamp, videoLink: currentURL, videoHash }),
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
