import { Toaster } from "../../components/ui/sonner";
import CreatorMode from "@/components/creator-mode";

export default function CreatorPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                    Creator Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                    Upload and manage your videos
                </p>
            </div>
            <CreatorMode />
            <Toaster />
        </div>
    );
}
