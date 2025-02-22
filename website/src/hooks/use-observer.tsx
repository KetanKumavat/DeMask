"use client"

import { cn } from "@/lib/utils"
import React, { HTMLAttributes, memo, useEffect, useRef, useState } from "react"

export default function useObserver() {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const Observer = memo((props: HTMLAttributes<HTMLDivElement>) => {
		const ref = useRef<HTMLDivElement>(null)

		useEffect(() => {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			})

			if (ref.current) {
				observer.observe(ref.current)
			}
			const current = ref.current
			return () => {
				if (current) {
					observer.unobserve(current)
				}
			}
		}, [])
		return (
			<div
				{...props}
				ref={ref}
				className={cn(
					"pointer-events-none invisible contents",
					props.className
				)}
			></div>
		)
	})
	Observer.displayName = "Observer"
	return { isVisible, Observer }
}
