"use client"
import { ReactLenis } from "lenis/react"
export default function Lenis({ children }: { children: React.ReactNode }) {
	return (
		<ReactLenis
			root
			options={{ lerp: 0.1, duration: 1.25, smoothWheel: true }}
		>
			{children}
		</ReactLenis>
	)
}
