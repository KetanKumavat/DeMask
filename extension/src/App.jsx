import React, { useState, useEffect } from "react";
import { Power, Camera, AlertCircle, Video, Settings } from "lucide-react";

const App = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState("idle");
    const [frameCount, setFrameCount] = useState(0);
    const [isExtension, setIsExtension] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const isRunningAsExtension =
            typeof chrome !== "undefined" && chrome.storage;
        setIsExtension(isRunningAsExtension);

        if (isRunningAsExtension) {
            chrome.storage.local.get(["isEnabled", "frameCount"], (result) => {
                setIsEnabled(result.isEnabled || false);
                setFrameCount(result.frameCount || 0);
            });

            chrome.runtime.onMessage.addListener((message) => {
                if (message.type === "FRAME_CAPTURED") {
                    setFrameCount((prev) => prev + 1);
                    setStatus("capturing");
                } else if (message.type === "CAPTURE_ERROR") {
                    setStatus("error");
                }
            });
        }
    }, []);

    const toggleExtension = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);

        if (isExtension) {
            chrome.storage.local.set({ isEnabled: newState });

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]?.id) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: newState ? "START_CAPTURE" : "STOP_CAPTURE",
                    });
                }
            });
        } else {
            console.log("Toggle state:", newState);
        }

        setStatus(newState ? "capturing" : "idle");
    };

    return (
        <div className="w-80 bg-gradient-to-b from-gray-50 to-white min-h-[400px] shadow-lg">
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <Camera className="w-5 h-5 text-blue-600" />
                    </div>
                    <h1 className="text-lg font-semibold text-gray-900">
                        Frame Extractor
                    </h1>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                    <Settings className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="p-6 space-y-6">
                {/* Development Mode Notice */}
                {!isExtension && (
                    <div className="text-xs bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="text-amber-700">
                            Running in development mode
                        </span>
                    </div>
                )}

                {/* Status Card */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    status === "capturing"
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                } ${isEnabled ? "animate-pulse" : ""}`}
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {status === "capturing" ? "Active" : "Standby"}
                            </span>
                        </div>
                        <button
                            onClick={toggleExtension}
                            className={`w-14 h-7 rounded-full p-1 transition-colors duration-200 ${
                                isEnabled ? "bg-blue-600" : "bg-gray-200"
                            }`}
                        >
                            <div
                                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                                    isEnabled
                                        ? "translate-x-7"
                                        : "translate-x-0"
                                }`}
                            >
                                <Power className="w-3 h-3 text-gray-600" />
                            </div>
                        </button>
                    </div>

                    {/* Stats */}
                    {isEnabled && (
                        <div className="pt-3 border-t border-gray-50">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Video className="w-4 h-4" />
                                <span>Frames captured: </span>
                                <span className="font-semibold text-gray-900">
                                    {frameCount}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Error State */}
                {status === "error" && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">
                            Connection Error
                        </span>
                    </div>
                )}

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {isEnabled
                            ? "Navigate to any page with video content to start capturing frames automatically."
                            : "Toggle the switch above to enable frame capture."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
