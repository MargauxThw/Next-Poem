"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Engagement } from "next/font/google";
import { SignedIn } from "@clerk/nextjs";

const engagement = Engagement({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="hidden md:flex">
			<Link href="/" className="mr-4 flex items-center gap-0 md:mr-12">
				{/* <div>
          <img
            src="/quill.svg"
            alt="Quill in ink pot"
            // width={100} // Optional: Set the width
            // height={100} // Optional: Set the height
            className="h-6 w-8"
          />
        </div> */}

				<span
					className={`${engagement.className} " hidden text-3xl md:inline-block mr-"`}
				>
					{"Next Poems"}
				</span>
			</Link>
			<nav className="flex items-center gap-4 text-sm md:gap-10">
				<Link
					href="/random"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/random")
							? "font-bold border-b-2 border-b-primary"
							: "text-foreground/80"
					)}
				>
					Random
				</Link>
				<Link
					href="/browse"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/browse")
							? "font-bold border-b-2 border-b-primary"
							: "text-foreground/80"
					)}
				>
					Browse
				</Link>
				<SignedIn>
					<Link
						href="/my-poems"
						className={cn(
							"transition-colors hover:text-foreground/80",
							pathname?.startsWith("/my-poems")
								? "font-bold border-b-2 border-b-primary"
								: "text-foreground/80"
						)}
					>
						My Poems
					</Link>
				</SignedIn>
			</nav>
		</div>
	);
}
