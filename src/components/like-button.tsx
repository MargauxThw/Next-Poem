"use client";

import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function LikeButton({ isAnimating }: { isAnimating: boolean }) {
	const [heart, setHeart] = useState<boolean>(false);

	const handleHeartClick = () => {
		setHeart(!heart);
	};

	return (
		<Button
			variant="outline"
			onClick={handleHeartClick}
			size="icon"
			disabled={isAnimating}
		>
      <span className="sr-only">{`${heart ? "Unlike poem" : "Like poem"}`}</span>
			<Heart
				fill={heart ? "red" : "white"}
				stroke={heart ? "red" : "black"}
			/>
		</Button>
	);
}
