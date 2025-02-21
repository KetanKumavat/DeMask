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
