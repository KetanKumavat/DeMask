chrome.runtime.onInstalled.addListener(() => {
    console.log("Auto Frame Extractor Installed!");
    // Initialize extension state
    chrome.storage.local.set({
        isEnabled: false,
        frameCount: 0,
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Extension Started");
});

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CAPTURE_FRAME") {
        fetch("http://localhost:3001/save-frame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: message.image }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Optionally, send a notification back to content.js
                    chrome.runtime.sendMessage({ type: "FRAME_CAPTURED" });
                } else {
                    chrome.runtime.sendMessage({
                        type: "CAPTURE_ERROR",
                        error: data.reason,
                    });
                }
            })
            .catch((error) => {
                chrome.runtime.sendMessage({
                    type: "CAPTURE_ERROR",
                    error: error.message,
                });
            });
        // Return true to indicate you wish to send a response asynchronously.
        return true;
    }
});
