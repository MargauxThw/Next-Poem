"use client";

import { Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";

export default function RandomActionBar({
	newRandomPoem,
	isValidPoem,
  isAnimating
}: {
	newRandomPoem: () => void;
	isValidPoem: boolean;
	isAnimating: boolean;
}) {
	return (
		<div className="flex gap-2">
			{isValidPoem && <LikeButton isAnimating={isAnimating} />}
			<Button variant="outline" onClick={newRandomPoem} disabled={isAnimating}>
				New random poem
				<Shuffle />
			</Button>
		</div>
	);
}
