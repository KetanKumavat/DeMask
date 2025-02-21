import { Badge } from "@/components/ui/badge"
import React from "react"

export default function Hero() {
	return (
		<>
			<section className="hero">
				<div className="min-h-[65dvh] content-end justify-items-center opacity-0 scale-90 animate-[reveal_1s_forwards]">
					<Badge className="select-none font-normal text-xl rounded-full text-primary bg-primary/20 hover:bg-primary/30 relative | before:absolute before:-bottom-0.5 before:-right-0.5 before:size-3 before:rounded-full before:bg-primary">
						Unmask the Fake . Protect the Real
					</Badge>
					<h1 className="mt-6 text-5xl font-semibold text-center leading-tight">
						Real-time deepfake detection <br /> and video
						authentication <br /> for live streams and social media
					</h1>
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
					</div>
				</div>
			</section>
		</>
	)
}
