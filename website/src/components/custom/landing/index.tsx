import React from "react";
import Navbar from "../navbar";
import Hero from "./hero";
import Lenis from "@/components/wrappers/lenis";
import Info from "./info";
import Bento from "./bento";
import Footer from "../footer";

export default function Landing() {
    return (
        <Lenis>
            <div className="landingWrapper | grid *:[grid-area:1/-1]">
                <Navbar />
                <main className="landing | pb-16">
                    <Hero />
                    <Info />
                    <Bento />
                    {/* <ExtensionBento /> */}
                </main>
            </div>
            <Footer />
        </Lenis>
    );
}
