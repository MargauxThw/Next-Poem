"use client";

import { fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { Poem, PoemFilter } from "@/lib/types";
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

		const getLocalStorageFilters = () => {
			let filters: PoemFilter = {};

			const linesText = localStorage.getItem("linesText");
			const titleText = localStorage.getItem("titleText");
			const titleAbs = localStorage.getItem("titleAbs");
			const authorText = localStorage.getItem("authorText");
			const authorAbs = localStorage.getItem("authorAbs");

			if (linesText && Number.parseInt(linesText)) {
				filters.linecount = Number.parseInt(linesText);
			}

			if (titleText) {
				filters.titleText = titleText;
			}

			if (authorText) {
				filters.authorText = authorText;
			}

			if (titleAbs === "true") {
				filters.titleAbs = true;
			}

			if (authorAbs === "true") {
				filters.authorAbs = true;
			}

			return filters;
		};

		const newPoem = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters(),
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
