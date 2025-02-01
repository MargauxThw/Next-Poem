"use client";

import { fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { Poem, PoemFilter } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { samplePoem } from "@/lib/dummy-data";
import { getLocalStorageFilters } from "@/lib/utils";

export default function Page() {

	const [poem, setPoem] = useState<Poem | null>(null);
	const [isNew, setIsNew] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const updatePoem = async () => {
		setIsLoading(true);

		const getRandomPoem = (poems: Array<Poem>) => {
			// Select a random poem from the results (excluding the current poem)
			let randomIndex = Math.floor(Math.random() * poems.length);
			let currPoem = poems.find(
				(p): p is Poem => p.title === poem?.title
			);
			const currentPoemIndex = currPoem ? poems.indexOf(currPoem) : -1;

			if (randomIndex == currentPoemIndex) {
				if (poems.length == 1) {
					return {
						message:
							"No poems could be found. Try adjusting the filters.",
					};
				} else if (randomIndex == 0) {
					randomIndex += 1;
				} else {
					randomIndex -= 1;
				}
			}

			const randomPoem = poems[randomIndex];

			return randomPoem;
		};

		const poemList = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters()
		);

		if ("message" in poemList) {
			setHasError(true);
			setErrorMessage(poemList.message);
			setIsLoading(false);
			setIsNew(true);
		} else {
			const newPoem = getRandomPoem(poemList);

			if ("message" in newPoem) {
				setHasError(true);
				setErrorMessage(newPoem.message);
				setIsLoading(false);
				setIsNew(true);
			} else {
				setIsLoading(false);
				setIsNew(true);
				setPoem(newPoem);
				setHasError(false);
				setErrorMessage("");
			}
		}
	};

	useEffect(() => {
		if (poem == null) {
			setPoem(samplePoem);
			updatePoem();
		}
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
			{poem ? (
				<main
					className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
						isNew ? "animate-blur-in" : ""
					} ${isLoading ? "animate-blur-in-out" : ""}`}
				>
					{hasError ? (
						<p>{errorMessage}</p>
					) : (
						<PoemLayout child={poem} />
					)}
					<Separator />
					<RandomActionBar
						initiateFetch={updatePoem}
						isValidPoem={!hasError}
						isAnimating={isLoading}
						poem={poem}
					/>
				</main>
			) : (
				<></>
			)}
		</div>
	);
}
