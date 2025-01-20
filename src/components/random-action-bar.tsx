"use client";

import { Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { FilterButton } from "./random-filter-button";
import { Poem } from "@/lib/types";

export default function RandomActionBar({
	initiateFetch,
	isValidPoem,
	isAnimating,
	poem
}: {
	initiateFetch: () => void;
	isValidPoem: boolean;
	isAnimating: boolean;
	poem: Poem;
}) {
	return (
		<div className="flex gap-2">
      <FilterButton initiateFetch={initiateFetch} />
			{isValidPoem && <LikeButton isAnimating={isAnimating} poem={poem} />}
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
