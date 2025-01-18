"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";

export default function BrowseActionBar({
	next,
	prev,
}: {
	next: () => void;
	prev: () => void;
}) {
	return (
		<div className="flex gap-2">
			<LikeButton isAnimating={false} />
			<Button variant="outline" onClick={prev} className="pl-2">
				<ChevronLeft />
				Previous poem
			</Button>
			<Button variant="outline" onClick={next} className="pr-2">
				Next poem
				<ChevronRight />
			</Button>
		</div>
	);
}
