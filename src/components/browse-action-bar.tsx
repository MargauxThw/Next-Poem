"use client";

import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import LikeButton from "./like-button";
import { Button } from "./ui/button";

export default function BrowseActionBar({
	next,
	prev,
	random,
	numPoems,
}: {
	next: () => void;
	prev: () => void;
	random: () => void;
	numPoems: number;
}) {
	return (
		<div className="flex gap-2">
			<LikeButton isAnimating={false} />
			{numPoems > 1 ? (
				<>
					<Button variant="outline" onClick={random} size={"icon"}>
						<span className="sr-only">Next random poem</span>
						<Shuffle />
					</Button>
					<Button variant="outline" onClick={prev} size="icon">
						<span className="sr-only">
							Previous poem in browse order
						</span>
						<ChevronLeft />
					</Button>
					<Button variant="outline" onClick={next} size="icon">
						<span className="sr-only">
							Next poem in browse order
						</span>
						<ChevronRight />
					</Button>
				</>
			) : (
				<> </>
			)}

			{/* <Button variant="outline" onClick={prev} className="pl-2">
				<ChevronLeft />
				Previous poem
			</Button>
			<Button variant="outline" onClick={next} className="pr-2">
				Next poem
				<ChevronRight />
			</Button> */}
		</div>
	);
}
