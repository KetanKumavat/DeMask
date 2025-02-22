import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export default function BentoCard({
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
