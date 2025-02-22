"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, Download } from "lucide-react";

export default function CreatorMode() {
    const [image, setImage] = useState<File | null>(null);
    const [results, setResults] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processedFile, setProcessedFile] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setResults([]);
            setProcessedFile(null);
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("file", image);

        setIsProcessing(true);
        setProgress(0);

        try {
            const response = await fetch(
                "https://2e62-123-252-147-173.ngrok-free.app/poison/adversarial",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Failed to process image");

            const blob = await response.blob();
            const fileURL = URL.createObjectURL(blob);
            setProcessedFile(fileURL);
            setProgress(100);

            // You might want to handle results differently for images
            setResults([{ score: 0.8, label: "Deepfake" }]); // Example result
        } catch (error) {
            console.error("Error processing image:", error);
        }

        setIsProcessing(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-center space-x-4">
                <Button
                    onClick={() =>
                        document.getElementById("file-upload")?.click()
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                {image && (
                    <Button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Play className="mr-2 h-4 w-4" /> Process Image
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Original"
                            className="w-full rounded-lg shadow-lg"
                        />
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    {processedFile && (
                        <img
                            src={processedFile}
                            alt="Processed"
                            className="w-full rounded-lg shadow-lg"
                        />
                    )}
                </div>
            </div>

            {isProcessing && (
                <div className="space-y-2">
                    <div className="text-center text-blue-800 font-semibold">
                        Processing image...
                    </div>
                    <Progress
                        value={progress}
                        className="w-full h-2 bg-blue-200"
                        // indicator="bg-blue-600"
                    />
                </div>
            )}

            {processedFile && (
                <div className="flex justify-center">
                    <a href={processedFile} download="processed_image.jpg">
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Download className="mr-2 h-4 w-4" /> Download
                            Processed Image
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
}
