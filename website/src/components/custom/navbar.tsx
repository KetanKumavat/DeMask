"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "../login-modal";
import { SignupModal } from "../signup-modal";
import { useAuth } from "@/app/context/auth-context";
import Image from "next/image";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleSwitchToSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    const handleSwitchToLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    return (
        <>
            <header className="z-[9999] h-fit sticky top-0 flex justify-between px-6 py-6 isolate | before:absolute before:inset-0 before:-z-10 before:backdrop-blur-sm before:[mask-image:linear-gradient(black_25%,transparent)]">
                <div className="italic font-extrabold">
                    <Image
                        src="/logo.webp"
                        alt=""
                        className="size-14 rounded-full"
                    />
                </div>
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-primary">
                                Welcome, {user.firstName} ({user.role})
                            </span>
                            <Button onClick={logout} variant="outline">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setShowLogin(true)}>
                                Login
                            </Button>
                            <Button onClick={() => setShowSignup(true)}>
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            </header>

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitchToSignup={handleSwitchToSignup}
            />
            <SignupModal
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                onSwitchToLogin={handleSwitchToLogin}
            />
        </>
    );
}
