"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function LikeButton({ isAnimating }: { isAnimating: boolean }) {
	const [heart, setHeart] = useState<boolean>(false);

	const handleHeartClick = () => {
		setHeart(!heart);
	};

	return (
		<>
			<SignedIn>
				<Button
					variant="outline"
					onClick={handleHeartClick}
					size="icon"
					disabled={isAnimating}
				>
					<span className="sr-only">{`${
						heart ? "Unlike poem" : "Like poem"
					}`}</span>
					<Heart
						fill={heart ? "red" : "white"}
						stroke={heart ? "bg-inherit" : "black"}
					/>
				</Button>
			</SignedIn>
			<SignedOut>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							disabled={isAnimating}
						>
							<span className="sr-only">{`${
								heart ? "Unlike poem" : "Like poem"
							}`}</span>
							<Heart
								fill={"white"}
								stroke={"black"}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<p>Log in or sign up to save poems</p>
					</PopoverContent>
				</Popover>
			</SignedOut>
		</>
	);
}
