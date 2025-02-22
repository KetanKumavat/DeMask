"use client"
import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"
import FaceMeshRed from "../../../../public/face-mesh-phone-red.webp"
import FaceMeshGreen from "../../../../public/face-mesh-phone-green.webp"
import useObserver from "@/hooks/use-observer"

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

export default function Bento() {
	const { isVisible, Observer } = useObserver()

	return (
		<section>
			<div className="bentoWrapper | max-w-screen-lg mx-auto grid grid-cols-2">
				<BentoCard className="col-span-2 aspect-[1.55] grid grid-rows-[1fr_auto]">
					<div className="imagesWrapper | relative grid *:[grid-area:1/-1] place-items-center pb-8">
						{/* <img
							src="/face-mesh-phone-red.webp"
							alt=""
							className="w-1/3 -translate-x-full [object-fit:200%]"
						/>
						<img
							src="/face-mesh-phone-green.webp"
							alt=""
							className="w-1/3 [object-fit:200%]"
						/>
						<img
							src="/face-mesh-phone-red.webp"
							alt=""
							className="w-1/3 translate-x-full [object-fit:200%]"
						/> */}
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
				<div></div>
				<div></div>
			</div>
		</section>
	)
}
