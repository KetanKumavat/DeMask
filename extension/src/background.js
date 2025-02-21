chrome.runtime.onInstalled.addListener(() => {
    console.log("Auto Frame Extractor Installed!");
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Extension Started");
});
