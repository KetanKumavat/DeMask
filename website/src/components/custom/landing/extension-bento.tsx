import BentoCard from "@/components/wrappers/bento-card";
import Image from "next/image";
import React from "react";

export default function ExtensionBento() {
    return (
        <section className="extensionBento">
            <div className="bentoWrapper | max-w-screen-lg mx-auto grid gap-2 grid-cols-2 px-2 py-12">
                <BentoCard className="p-0 overflow-clip">
                    <div className="p-12 text-center">
                        <h2 className="text-2xl font-medium">
                            Real-Time Deepfake Detection
                        </h2>
                        <p className="mt-4 italic text-lg font-medium">
                            Analyzes videos frame by frame to uncover
                            manipulations instantly.
                        </p>
                    </div>
                    <figure className="px-8 overflow-clip">
                        <Image
                            src="/extension-off.png"
                            alt=""
                            className="rounded-3xl ~translate-y-4"
                        />
                    </figure>
                </BentoCard>
                <BentoCard className="p-0 overflow-clip">
                    <div className="p-12 text-center">
                        <h2 className="text-2xl font-medium">
                            Watermark for Unverified Videos
                        </h2>
                        <p className="mt-4 italic text-lg font-medium">
                            Marks suspicious content to ensure transparency and
                            accountability.
                        </p>
                    </div>
                    <figure className="px-8 overflow-clip">
                        <Image
                            src="/extension-on.png"
                            alt=""
                            className="rounded-3xl ~translate-y-4"
                        />
                    </figure>
                </BentoCard>
                <BentoCard className="col-span-full p-0 overflow-clip grid lg:grid-cols-2">
                    <div className="p-12 ~text-center content-end">
                        <h2 className="text-2xl lg:text-4xl font-black italic text-text/20~ text-transparent bg-clip-text bg-gradient-to-tr from-text/20 to-accent">
                            Comprehensive Video Reports
                        </h2>
                        <p className="italic text-lg font-medium">
                            Tracks past detections with detailed insights and
                            accuracy rates.
                        </p>
                    </div>
                    <figure className="p-6 lg:p-0 lg:pt-12">
                        <Image
                            src="report.png"
                            alt=""
                            className="rounded-3xl lg:rounded-none lg:rounded-tl-3xl"
                        />
                    </figure>
                </BentoCard>
            </div>
        </section>
    );
}
