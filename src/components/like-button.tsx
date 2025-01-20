"use client";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Poem } from "@/lib/types";
import { useEffect } from "react";
import { getIsLiked, likePoem, unlikePoem } from "@/utils/supabaseRequests";
// import { useOptimistic } from "react";

export default function LikeButton({
	isAnimating,
	poem,
}: {
	isAnimating: boolean;
	poem: Poem;
}) {
	const { userId, getToken } = useAuth();
	const [isLiked, setIsLiked] = useState<boolean>(false);
	// const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);

	const getIsLikedDB = async () => {
		const token = await getToken({ template: "supabase-next-poems" });
		if (userId && token) {
			const likedInDB = await getIsLiked({ userId, token, poem });
			return likedInDB;
		}
		return false;
	};

	const likeDB = async () => {
		const token = await getToken({ template: "supabase-next-poems" });
		if (userId && token) {
			await likePoem({ userId, token, poem });
		}
	};

	const unlikeDB = async () => {
		const token = await getToken({ template: "supabase-next-poems" });
		if (userId && token) {
			await unlikePoem({ userId, token, poem });
		}
	};

	useEffect(() => {
		setIsLiked(false);
		getIsLikedDB().then((likedInDB) => setIsLiked(likedInDB));
	}, [poem]);


	const handleHeartClick = async () => {
		if (isLiked) {
			await unlikeDB();
		} else {
			await likeDB();
		}

		getIsLikedDB().then((likedInDB) => setIsLiked(likedInDB));
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
						isLiked ? "Unlike poem" : "Like poem"
					}`}</span>
					<Heart
						fill={isLiked ? "red" : "white"}
						stroke={isLiked ? "bg-inherit" : "black"}
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
							<span className="sr-only">Like poem</span>
							<Heart fill={"white"} stroke={"black"} />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<p><a href="/login">Log in or sign up</a> to save poems</p>
					</PopoverContent>
				</Popover>
			</SignedOut>
		</>
	);
}
