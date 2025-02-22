import React from "react"
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
	return (
		<header className="z-[9999] h-fit sticky top-0 flex justify-between px-6 py-6 isolate | before:absolute before:inset-0 before:-z-10 before:backdrop-blur-sm before:[mask-image:linear-gradient(black_25%,transparent)]">
			<div className="italic font-extrabold">
				<img src="/logo.webp" alt="" className="size-14 rounded-full" />
			</div>
			<div className="flex gap-4 items-center">
				<header className="flex justify-end items-center p-4 gap-4 h-16">
					<SignedOut>
						<SignInButton mode="modal"/>
						<SignUpButton mode="modal"/>
					</SignedOut>
					<SignedIn>
						<UserButton showName/>
					</SignedIn>
				</header>
			</div>
		</header>
	)
}
