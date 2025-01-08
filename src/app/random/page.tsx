"use client";

import { fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { ErrorMessage, Poem } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { samplePoem } from "@/lib/dummy-data";

export default function Page() {
	const [poem, setPoem] = useState<Poem | null>(null);
	const [isNew, setIsNew] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const updatePoem = async () => {
		setIsLoading(true);

		const newPoem = await fetchNewRandomFilteredPoems(
			{ linecount: 2 },
			poem ? poem.title : ""
		);

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
	};

	useEffect(() => {
		if (poem == null) {
			setPoem(samplePoem);
			updatePoem();
		}
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
			{poem ? (
				<main
					className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg ${
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
						newRandomPoem={updatePoem}
						isValidPoem={!hasError}
						isAnimating={isLoading}
					/>
				</main>
			) : (
				<></>
			)}
		</div>
	);
}
