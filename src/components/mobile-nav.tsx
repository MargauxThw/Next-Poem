"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
// import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button";

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "./ui/separator";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const [metaColor, setMetaColor] = React.useState("transparent");

	const onOpenChange = React.useCallback(
		(open: boolean) => {
			setOpen(open);
			setMetaColor(open ? "#09090b" : "transparent");
		},
		[setMetaColor, metaColor]
	);

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className="mx-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="!size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 9h16.5m-16.5 6.75h16.5"
						/>
					</svg>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[60svh] p-0">
				<DrawerTitle className="hidden">Menu</DrawerTitle>
				<DrawerDescription className="hidden">
					Menu and sub-menu items
				</DrawerDescription>
				<div className="overflow-auto p-6">
					<SignedOut>
						<div className="flex flex-col space-y-3">
							{[
								{ title: "Random poems", href: "/random" },
								{ title: "Browse & search", href: "/browse" },
							].map(
								(item) =>
									item.href && (
										<MobileLink
											key={item.href}
											href={item.href}
											onOpenChange={setOpen}
											className="text-m font-medium"
										>
											{item.title}
										</MobileLink>
									)
							)}
						</div>
					</SignedOut>
					<SignedIn>
						<div className="flex flex-col space-y-3">
							{[
								{ title: "Random poems", href: "/random" },
								{ title: "Browse & search", href: "/browse" },
								{ title: "My Poems", href: "/my-poems" },
							].map(
								(item) =>
									item.href && (
										<MobileLink
											key={item.href}
											href={item.href}
											onOpenChange={setOpen}
											className="text-m font-medium"
										>
											{item.title}
										</MobileLink>
									)
							)}
						</div>
					</SignedIn>
				</div>
				{/* <Separator className="w-auto mx-4"/>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {[
              { title: "Edit theme", href: "/random" },
              { title: "Account", href: "/browse" },
              { title: "Log out", href: "/my-poems" },
            ].map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </div> */}
			</DrawerContent>
		</Drawer>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn("text-base", className)}
			{...props}
		>
			{children}
		</Link>
	);
}
