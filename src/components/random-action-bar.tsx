"use client";

import { Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";

export default function RandomActionBar({
	newRandomPoem,
	isValidPoem,
}: {
	newRandomPoem: () => void;
	isValidPoem: Boolean;
}) {
	return (
		<div className="flex gap-2">
			{isValidPoem && <LikeButton />}
			<Button variant="outline" onClick={newRandomPoem}>
				New random poem
				<Shuffle />
			</Button>
		</div>
	);
}
