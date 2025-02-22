import type { Metadata } from "next";
import "./globals.css";
import RebondGrotesque from "@/lib/fonts";
import { AuthProvider } from "./context/auth-context";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "DeMask",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${RebondGrotesque.className} antialiased bg-background text-text`}
            >
                <AuthProvider>{children}</AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
