import React from "react"

function RevealText({ content }: { content: string }) {
	return (
		<p>
			<span className="font-medium bg-clip-text text-text/20 [background-size:0%_100%] bg-no-repeat bg-[linear-gradient(to_right,hsl(var(--text)),hsl(var(--text))_calc(100%_-_var(--blur)),transparent)] [--blur:5rem] animate-[text-reveal_linear_forwards] [animation-timeline:view()] [animation-range:cover_contain_25%]">
				{content}
			</span>
		</p>
	)
}

export default function Info() {
	return (
		<section>
			<div className="infoWrapper | px-2 mt-20 lg:mt-0 max-w-screen-md mx-auto space-y-12 lg:space-y-24 *:text-3xl lg:*:text-6xl pb-24">
				<RevealText
					content="Detect deepfakes in real time—spot face distortions, voice
					mismatches, and frame anomalies."
				/>
				<RevealText
					content="Protect your media with AI-disrupting data poisoning,
					stopping deepfake replication."
				/>
				<RevealText
					content="Unmask deception, safeguard authenticity, and take control
					of your digital presence."
				/>
			</div>
		</section>
	)
}
