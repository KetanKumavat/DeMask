"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, Loader2 } from "lucide-react";

interface VideoData {
    id: number;
    created_at: string;
    url: string;
    prediction: string;
    score: number | null;
    timestamp: number;
    approved: boolean;
}

export function ModeratorTable({ initialData }: { initialData: VideoData[] }) {
    const [data, setData] = useState<VideoData[]>(initialData);
    const [loading, setLoading] = useState<number | null>(null);

    const handleApprove = async (
        url: string,
        id: number,
        timestamp: Number
    ) => {
        setLoading(id);
        try {
            const response = await fetch(
                "https://2e62-123-252-147-173.ngrok-free.app/deepfake/approve",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url, timestamp }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to approve video");
            }

            // Update local state optimistically
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, approved: true } : item
                )
            );

            toast("Video has been approved successfully.");
        } catch (error) {
            toast("Failed to approve video. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="rounded-md border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>View Video</TableHead>
                        <TableHead>Prediction</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{formatDate(row.created_at)}</TableCell>
                            <TableCell>
                                <a
                                    href={row.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    <Eye />
                                </a>
                            </TableCell>
                            <TableCell>{row.prediction}</TableCell>
                            <TableCell>{row.timestamp}s</TableCell>
                            <TableCell>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                        row.approved
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {row.approved ? "Approved" : "Pending"}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    onClick={() =>
                                        handleApprove(
                                            row.url,
                                            row.id,
                                            row.timestamp
                                        )
                                    }
                                    disabled={
                                        row.approved || loading === row.id
                                    }
                                    variant={row.approved ? "ghost" : "default"}
                                    size="sm"
                                >
                                    {loading === row.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : row.approved ? (
                                        "Approved"
                                    ) : (
                                        "Approve"
                                    )}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
