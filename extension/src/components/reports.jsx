import {
    ArrowLeft,
    AlertTriangle,
    Calendar,
    Clock,
    LinkIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = ({ setStep }) => {
    const [stats, setStats] = useState({
        totalScanned: 0,
        deepfakesDetected: 0,
        detectionRate: 0,
    });

    const [recentDetections, setRecentDetections] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(
                    "https://2e62-123-252-147-173.ngrok-free.app/deepfake/content",
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );

                console.log("Report Data:", response.data);
                const data = response.data;
                const totalScanned = data.total_count || 0;
                const deepfakesDetected = data.count || 0;
                const detectionRate =
                    totalScanned > 0
                        ? ((deepfakesDetected / totalScanned) * 100).toFixed(2)
                        : 0;

                setStats({ totalScanned, deepfakesDetected, detectionRate });

                setRecentDetections(
                    data.data.map((item) => ({
                        id: item.id,
                        title: `Detected Content ${item.id}`,
                        url: item.url,
                        timestamp: item.created_at,
                        confidence: item.score,
                    }))
                );
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReportData();
    }, []);

    return (
        <div className="w-128 bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 backdrop-blur-xl text-white max-h-[600px] overflow-y-auto shadow-2xl border border-neutral-700/50 p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 border-b border-neutral-700/50 pb-4">
                <button
                    className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition"
                    onClick={() => setStep(1)}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Deepfake Detection Report
                </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                    <div className="text-neutral-400 text-sm">
                        Total Content Scanned
                    </div>
                    <div className="text-2xl font-bold mt-1">
                        {stats.totalScanned.toLocaleString()}
                    </div>
                </div>
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                    <div className="text-neutral-400 text-sm">
                        Deepfakes Detected
                    </div>
                    <div className="text-2xl font-bold mt-1 text-amber-500">
                        {stats.deepfakesDetected.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-neutral-400">
                        Detection Rate
                    </div>
                    <div className="text-sm font-medium text-amber-500">
                        {stats.detectionRate}%
                    </div>
                </div>
                <div className="w-full h-2 bg-neutral-700 rounded-full">
                    <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{ width: `${stats.detectionRate}%` }}
                    ></div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">
                    Recent Detections
                </h2>
                <div className="space-y-3">
                    {recentDetections.length > 0 ? (
                        recentDetections.map((detection) => (
                            <div
                                key={detection.id}
                                className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 hover:border-neutral-600 transition-colors"
                            >
                                <div className="flex flex-wrap items-start justify-between">
                                    <div>
                                        <div className="font-medium">
                                            {detection.title}
                                        </div>
                                        <div className="flex items-center space-x-3 mt-2 text-sm text-neutral-400">
                                            <div className="flex items-center">
                                                <LinkIcon className="w-3.5 h-3.5 mr-1" />
                                                <a
                                                    href={detection.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                    {detection.url}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center space-x-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-xs font-medium">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span>
                                            {detection.confidence}% Match
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-3 text-xs text-neutral-500">
                                    <div className="flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1" />
                                        {new Date(
                                            detection.timestamp
                                        ).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-1" />
                                        {new Date(
                                            detection.timestamp
                                        ).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-neutral-400">No detections found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
