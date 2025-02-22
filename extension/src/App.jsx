import React, { useState, useEffect } from "react";
import { Power, Camera, AlertCircle, Video, Settings } from "lucide-react";
import { cn } from "./utils.jsx";

const App = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState("idle");
    const [frameCount, setFrameCount] = useState(0);
    const [isExtension, setIsExtension] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isRunningAsExtension =
            typeof chrome !== "undefined" && chrome.storage;
        setIsExtension(isRunningAsExtension);

        if (isRunningAsExtension) {
            chrome.storage.local.get(["isEnabled", "frameCount"], (result) => {
                setIsEnabled(result.isEnabled || false);
                setFrameCount(result.frameCount || 0);
            });

            console.log("Extension is running");
            console.log("isEnabled : ", isEnabled);

            // Add listener for video state changes
            chrome.runtime.onMessage.addListener((message) => {
                if (message.type === "STOP_CAPTURE") {
                    setStatus("idle");
                    setIsEnabled(false);
                }
                if (message.type === "START_CAPTURE") {
                    setStatus("capturing");
                    setIsEnabled(true);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (isExtension) {
            chrome.storage.local.get(["frameCount"], (result) => {
                setFrameCount(result.frameCount || 0);
            });

            chrome.storage.onChanged.addListener((changes) => {
                if (changes.frameCount) {
                    setFrameCount(changes.frameCount.newValue);
                }
            });
        }
    }, [isExtension]);

    const toggleExtension = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        setStatus(newState ? "capturing" : "idle");

        if (isExtension) {
            chrome.storage.local.set({ isEnabled: newState });
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]?.id) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: newState ? "START_CAPTURE" : "STOP_CAPTURE",
                    });
                }
            });
        }
    };

    return (
        <div className="w-80 bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 backdrop-blur-xl text-white min-h-[400px] shadow-2xl border border-neutral-700/50 p-4">
            {/* Header */}
            <div className="flex justify-center items-center border-b border-neutral-700/50 pb-4">
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-white text-3xl text-center font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text">
                        Deepfake Detector
                    </h1>
                </div>
            </div>

            <div className="py-6 space-y-6">
                {isExtension && (
                    <div className="text-xs bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-center space-x-2 transition-colors animate-pulse">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-200">
                            Running in Dev Mode
                        </span>
                    </div>
                )}

                {/* Status Card */}
                <div className="bg-black/20 backdrop-blur-sm p-5 rounded-xl border border-neutral-800 shadow-lg space-y-4 transition-all duration-200 hover:border-neutral-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-500",
                                    status === "capturing"
                                        ? "bg-emerald-500"
                                        : "bg-neutral-500",
                                    isEnabled &&
                                        "animate-pulse shadow-lg shadow-emerald-500/20"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    status === "capturing"
                                        ? "text-emerald-300"
                                        : "text-neutral-300"
                                )}
                            >
                                {status === "capturing" ? "Active" : "Standby"}
                            </span>
                        </div>

                        {/* Enhanced Toggle Button */}
                        <button
                            onClick={toggleExtension}
                            className={cn(
                                "w-14 h-7 rounded-full p-1 transition-all duration-300 ease-spring",
                                "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900",
                                isEnabled
                                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 focus:ring-cyan-500"
                                    : "bg-neutral-700 focus:ring-neutral-600"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-spring flex items-center justify-center",
                                    isEnabled
                                        ? "translate-x-7"
                                        : "translate-x-0",
                                    "hover:shadow-lg"
                                )}
                            >
                                <Power
                                    className={cn(
                                        "w-3 h-3 transition-colors duration-200",
                                        isEnabled
                                            ? "text-cyan-500"
                                            : "text-neutral-400"
                                    )}
                                />
                            </div>
                        </button>
                    </div>

                    {isEnabled && (
                        <div className="pt-4 border-t border-neutral-800">
                            <div className="flex items-center space-x-2.5 text-sm">
                                <Video className="w-4 h-4 text-neutral-400" />
                                <span className="text-neutral-300">
                                    Frames captured:
                                </span>
                                <span className="font-semibold text-white tabular-nums">
                                    {frameCount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3.5 flex items-center space-x-2.5 animate-pulse">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-200 font-medium">
                            Connection Error
                        </span>
                    </div>
                )}

                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-200 hover:bg-black/30">
                    <p className="text-xs text-neutral-300 leading-relaxed">
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