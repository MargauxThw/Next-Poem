"use client";

import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { FilterButton } from "@/components/browse-filter-button";
import { useEffect, useMemo, useState } from "react";
import { Poem, PoemFilter, sortingOption } from "@/lib/types";
import { fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemCard from "@/components/poem-card";
import { BrowsePagination } from "@/components/browse-pagination";
import { samplePoemList } from "@/lib/dummy-data";

export default function Page() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [poems, setPoems] = useState<Array<Poem>>([]);
	const [sortMode, setSortMode] = useState<sortingOption>(
		sortingOption.titleAZ
	);
	const [isNew, setIsNew] = useState<boolean>(true);
	// const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const updatePoemList = async () => {
		const getLocalStorageFilters = () => {
			let filters: PoemFilter = {};

			const linesText = localStorage.getItem("linesText_browse");
			const titleText = localStorage.getItem("titleText_browse");
			const titleAbs = localStorage.getItem("titleAbs_browse");
			const authorText = localStorage.getItem("authorText_browse");
			const authorAbs = localStorage.getItem("authorAbs_browse");

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

		// setIsLoading(true);
		setIsNew(true);

		setHasError(false);
		setErrorMessage("");
		setPoems([]);

		const newPoemList = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters(),
			true
		);

		if ("message" in newPoemList) {
			setHasError(true);
			setErrorMessage(newPoemList.message);
			// setIsLoading(false);
			setIsNew(false);
		} else {
			setPoems(newPoemList);
			setCurrentPage(1);
			// setIsLoading(false);
			setIsNew(false);
			setHasError(false);
			setErrorMessage("");
		}
	};

	useEffect(() => {
		updatePoemList();
	}, []);

	const totalPages = useMemo(() => {
		return Math.ceil(poems.length / 10);
	}, [poems]);

	const sortedPoems = useMemo(() => {
		switch (sortMode) {
			case sortingOption.authorAZ:
				return poems.sort((a, b) => a.author.localeCompare(b.author));

			case sortingOption.authorZA:
				return poems.sort((a, b) => b.author.localeCompare(a.author));

			case sortingOption.titleAZ:
				return poems.sort((a, b) => a.title.localeCompare(b.title));

			case sortingOption.titleZA:
				return poems.sort((a, b) => b.title.localeCompare(a.title));

			case sortingOption.linesAsc:
				return poems.sort((a, b) => a.lines.length - b.lines.length);

			case sortingOption.linesDesc:
				return poems.sort((a, b) => b.lines.length - a.lines.length);
			
			default:
				return poems;
		}
	}, [poems, sortMode]);

	const changePage = (newPageNumber: number) => {
		setCurrentPage(newPageNumber);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const openPoem = (poem: Poem) => {
		console.log("Opening", poem.title);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
			<main
				className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit`}
			>
				<div className="flex flex-col items-start sm:items-start gap-4 w-full">
					<h2 className="decoration-black font-bold text-xl">
						Browse poems
					</h2>
					<Separator />
					<div className="flex flex-row gap-2 w-full flex-wrap mb-0">
						<FilterButton initiateFetch={updatePoemList} />
						<Select
							value={sortMode}
							onValueChange={(value) =>
								setSortMode(
									Object.values(sortingOption).find(
										(v) => v === value
									) || sortMode
								)
							}
						>
							<SelectTrigger className="w-min justify-start gap-2">
								<span className="text-muted-foreground">
									Sort:
								</span>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.values(sortingOption).map(
									(option, index) => (
										<SelectItem key={index} value={option}>
											{option}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>
					<Separator />
				</div>
				{hasError ? (
					<p>{errorMessage}</p>
				) : poems && poems.length > 0 ? (
					<div
						className={`flex flex-col gap-4 w-full -mt-2 animate-blur-in`}
					>
						{sortedPoems
							.slice(
								currentPage === 1 ? 0 : currentPage * 10 - 10,
								currentPage * 10 >= poems.length
									? poems.length
									: currentPage * 10
							)
							.map((poem, index) => {
								return (
									<PoemCard
										key={index}
										poem={poem}
										openPoem={openPoem}
									/>
								);
							})}
					</div>
				) : (
					<div
						className={`flex flex-col gap-4 w-full -mt-2 animate-pulse`}
					>
						{samplePoemList.map((poem, index) => {
							return (
								<PoemCard
									key={index}
									poem={poem}
									openPoem={() => {}}
								/>
							);
						})}
					</div>
				)}
				{totalPages !== 1 && !isNew && !hasError ? (
					<>
						<Separator className="animate-blur-in" />
						<BrowsePagination
							currentPage={currentPage}
							totalPages={totalPages}
							setCurrentPage={changePage}
						/>
					</>
				) : (
					<></>
				)}
			</main>
		</div>
	);
}
