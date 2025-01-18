"use client";

import { Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { FilterButton } from "./random-filter-button";

export default function RandomActionBar({
	initiateFetch,
	isValidPoem,
	isAnimating,
}: {
	initiateFetch: () => void;
	isValidPoem: boolean;
	isAnimating: boolean;
}) {
	return (
		<div className="flex gap-2">
      <FilterButton initiateFetch={initiateFetch} />
			{isValidPoem && <LikeButton isAnimating={isAnimating} />}
			<Button
				variant="outline"
				onClick={initiateFetch}
				disabled={isAnimating}
			>
				New random poem
				<Shuffle />
			</Button>
		</div>
	);
}
