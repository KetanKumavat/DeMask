"use client"
import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"
import FaceMeshRed from "../../../../public/face-mesh-phone-red.webp"
import FaceMeshGreen from "../../../../public/face-mesh-phone-green.webp"
import useObserver from "@/hooks/use-observer"
import { marqueeKeywords } from "@/lib/constants"

function BentoCard({
	children,
	className,
	...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("bg-white rounded-[48px] p-12", className)}
			{...props}
		>
			{children}
		</div>
	)
}

function Marquee({ reverse }: { reverse?: boolean }) {
	return (
		<div
			className={`flex overflow-hidden py-4 select-none ${
				reverse ? "pt-2" : "pt-12"
			}`}
		>
			{Array.from({ length: 2 }).map((_, idx) => (
				<div
					key={idx}
					className={cn("flex gap-2", {
						"[--xTo:-100%] animate-[marquee_40s_linear_infinite]":
							!reverse,
						"-translate-x-full [--xTo:0%] animate-[marquee_38s_linear_infinite]":
							reverse,
					})}
				>
					{marqueeKeywords.map((keyword, idx) => (
						<div
							key={idx}
							className="text-center p-2 px-4 rounded-xl"
							style={{
								color: keyword.color,
								boxShadow:
									".18px .72px 1.24px -1px #383a3d0d, .68px 2.74px 4px -2px #383a3d0b,3px 12px 18px -3px #383a3d08",
							}}
						>
							<div
								className="icon | mx-auto size-6 rounded-full"
								style={{
									backgroundImage: `radial-gradient(circle at top right, ${keyword.color}, transparent)`,
									filter: `blur(${
										idx % 2 === 0 ? "2px" : "0"
									})`,
								}}
							></div>
							<p>{keyword.word}</p>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default function Bento() {
	const { isVisible, Observer } = useObserver()

	return (
		<section>
			<div className="bentoWrapper | max-w-screen-lg mx-auto grid gap-2 grid-cols-2 px-2">
				<BentoCard className="col-span-2 lg:aspect-[1.55] grid grid-rows-[1fr_auto]">
					<div className="imagesWrapper | relative grid *:[grid-area:1/-1] place-items-center pb-8 w-full aspect-[1.05] md:aspect-auto">
						<Observer className="absolute top-1/2" />
						<div
							className={cn(
								"h-full aspect-[309/541] bg-cover rounded-[32px] shadow-[0_8px_1rem_hsl(var(--text)/0.25)] bg-center transition-transform ease-in duration-700 -rotate-6",
								{
									"-translate-x-full": isVisible,
								}
							)}
							style={{
								backgroundImage: `url(${FaceMeshRed.src})`,
								backgroundSize: "180%",
								scale: "0.9",
							}}
						></div>
						<div
							className="h-full aspect-[309/541] bg-cover rounded-[32px] shadow-[0_8px_1rem_hsl(var(--text)/0.25)] bg-center z-10"
							style={{
								backgroundImage: `url(${FaceMeshGreen.src})`,
								backgroundSize: "160%",
							}}
						></div>
						<div
							className={cn(
								"h-full aspect-[309/541] bg-cover rounded-[32px] shadow-[0_8px_1rem_hsl(var(--text)/0.25)] bg-center transition-transform ease-in duration-700 rotate-6",
								{
									"translate-x-full": isVisible,
								}
							)}
							style={{
								backgroundImage: `url(${FaceMeshRed.src})`,
								backgroundSize: "180%",
								scale: "0.9",
							}}
						></div>
					</div>
					<div className="mt-6">
						<h2 className="text-5xl font-semibold">
							Real-Time Deepfake Detection
						</h2>
						<p className="mt-4 italic text-lg font-medium">
							Instantly detects face distortions, voice
							mismatches, and frame anomalies in live streams and
							videos.
						</p>
					</div>
				</BentoCard>
				<BentoCard className="p-0 col-span-2 lg:col-span-1">
					<Marquee />
					<Marquee reverse />
					<h2 className="text-2xl font-medium text-center py-6">
						AI-Powered Confidence Scoring
					</h2>
				</BentoCard>
				<BentoCard className="grid content-between col-span-2 lg:col-span-1">
					<h2 className="text-3xl lg:text-6xl font-black italic text-text/20 text-center">
						Automated Watermarking
					</h2>
					<p className="italic text-lg font-medium text-center">
						Marks unverified content with a watermark to ensure
						transparency and accountability.
					</p>
				</BentoCard>
			</div>
		</section>
	)
}
