import { ModeratorTable } from "../../components/moderator-table";
import { Toaster } from "../../components/ui/sonner";

const mockData = [
    {
        id: 2,
        created_at: "2025-02-22T08:08:57.286638+00:00",
        url: "https://youtu.be/XuKUkyPegBE?si=W4RcGchEaFZb1hYZ",
        prediction: "GreyArea",
        score: null,
        timestamp: 3.5,
        approved: false,
    },
    {
        id: 3,
        created_at: "2025-02-22T08:08:57.286638+00:00",
        url: "https://www.youtube.com/shorts/K2z_Q07hlog",
        prediction: "GreyArea",
        score: null,
        timestamp: 4.8,
        approved: false,
    },
];

export default function AdminPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                    Video Moderation Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                    Review and approve videos flagged for potential deepfake
                    content
                </p>
            </div>
            <ModeratorTable initialData={mockData} />
            <Toaster />
        </div>
    );
}
