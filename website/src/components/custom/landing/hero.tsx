import { Badge } from "@/components/ui/badge";
import React from "react";

export default function Hero() {
    return (
        <>
            <section className="hero">
                <div className="~min-h-[65dvh] pt-32 content-end justify-items-center opacity-0 scale-90 animate-[reveal_1s_forwards]">
                    {/* <h1 className="text-9xl italic font-thin text-transparent bg-clip-text bg-gradient-to-tr from-primary/40 to-primary/80">
						DeMask
					</h1> */}
                    <Badge className="mt-6 select-none font-normal lg:text-xl rounded-full text-primary bg-primary/20 hover:bg-primary/30 relative | before:absolute before:-bottom-0.5 before:-right-0.5 before:size-1.5 lg:before:size-3 before:rounded-full before:bg-primary">
                        Unmask the Fake . Protect the Real
                    </Badge>
                    <h2 className="mt-6 text-2xl lg:text-5xl font-semibold text-center leading-tight px-2">
                        Real-time deepfake detection <br /> and video
                        authentication <br /> for live streams and social media
                    </h2>
                </div>
                <div className="faceScan | relative max-w-screen-lg mx-auto grid *:[grid-area:1/-1] place-items-center">
                    <img
                        src="/hero-face.avif"
                        alt=""
                        className="[mask-image:radial-gradient(black_50%,transparent_70%)]"
                    />
                    <div className="absolute h-2/3">
                        <img
                            src="/phone.avif"
                            alt=""
                            className="h-full opacity-0 animate-[reveal_1s_1s_forwards]"
                        />
                        <span className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-background to-transparent mx-4 rounded-[100%] blur-[2px] top-1/4 animate-[scan_3s_linear_alternate_infinite]" />
                    </div>
                </div>
            </section>
        </>
    );
}
