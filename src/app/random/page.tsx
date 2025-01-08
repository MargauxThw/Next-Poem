"use client";

import { fetchNewRandomPoem, fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { ErrorMessage, Poem } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { samplePoem } from "@/lib/dummy-data";

export default function Page() {
	const [poem, setPoem] = useState<Poem | null>(null);
	const [isNew, setIsNew] = useState<Boolean>(false);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	const [hasError, setHasError] = useState<Boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const updatePoem = async () => {
		setIsLoading(true);
		console.log("1");

		const newPoem = await fetchNewRandomFilteredPoems({linecount: 3});
		console.log("2", newPoem);

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
					/>
				</main>
			) : (
				<></>
			)}
		</div>
	);
}
