"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
	return (
		<header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-12 sm:px-4">
			<div className="container-wrapper">
				<div className="container flex h-14 items-center justify-between my-0 mx-auto">
					<MainNav />
					<MobileNav />
					<div className="flex flex-1 w-2 items-center gap-2 justify-end">
						<nav className="flex items-center gap-2 justify-end mr-3">
							<Button variant="ghost" size="icon">
								<Link
									href={"/random"}
									target="_blank"
									rel="noreferrer"
								>
									<Palette />
									<span className="sr-only">Edit theme</span>
								</Link>
							</Button>
							<Button variant="outline">
								<Link
									href={"/login"}
									target="_blank"
									rel="noreferrer"
								>
									Log in
									<span className="sr-only">Log in</span>
								</Link>
							</Button>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
