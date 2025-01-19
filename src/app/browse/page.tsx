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
import { getLocalStorageFilters } from "@/lib/utils";
import PoemLayout from "@/components/poem-layout";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import BrowseActionBar from "@/components/browse-action-bar";
import { Badge } from "@/components/ui/badge";

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
	const [browseMode, setBrowseMode] = useState<boolean>(true);
	const [currentPoemIndex, setCurrentPoemIndex] = useState<number>(0);

	const updatePoemList = async () => {
		// setIsLoading(true);
		setIsNew(true);

		setHasError(false);
		setErrorMessage("");
		setPoems([]);

		const newPoemList = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters("_browse"),
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
		setBrowseMode(false);
		setCurrentPoemIndex(sortedPoems.indexOf(poem));
	};

	const getRandomPoemIndex = () => {
		let randomIndex = Math.floor(Math.random() * sortedPoems.length);
		if (randomIndex === currentPoemIndex) {
			randomIndex += 1;
			if (randomIndex >= sortedPoems.length) {
				randomIndex = 0;
			}
		}
		return randomIndex;
	};

		return (
			<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
				{browseMode ? (
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
												<SelectItem
													key={index}
													value={option}
												>
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
								<Badge
									variant={"outline"}
									className="border-0 text-muted-foreground justify-end px-0 py-0 -mt-1 font-light"
								>
									{`Poems ${
										currentPage === 1
											? 1
											: currentPage * 10 - 10 + 1
									}－${
										currentPage * 10 >= poems.length
											? poems.length
											: currentPage * 10
									} | ${sortedPoems.length} results`}
								</Badge>

								{sortedPoems
									.slice(
										currentPage === 1
											? 0
											: currentPage * 10 - 10,
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
												// heart={Math.random() > 0.5 ? true : false}
											/>
										);
									})}
							</div>
						) : (
							<div
								className={`flex flex-col gap-4 w-full -mt-2 animate-pulse`}
							>
								<Badge
									variant={"outline"}
									className="border-0 text-right text-muted-foreground justify-end px-0"
								>
									Loading
								</Badge>
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
				) : (
					<main
						className={`flex flex-col gap-8 row-start-0 items-start sm:items-start w-full max-w-lg h-fit ${
							isNew ? "animate-blur-in" : ""
						}`}
					>
						<div className="flex flex-row items-center justify-between w-full">
							<Button
								variant={"link"}
								className="px-0"
								onClick={() => setBrowseMode(true)}
							>
								<MoveLeft />
								Back to browse
							</Button>
							<Badge variant={"secondary"} className="px-1">{`${
								currentPoemIndex + 1
							} of ${sortedPoems.length}`}</Badge>
						</div>
						<PoemLayout child={sortedPoems[currentPoemIndex]} />
						<Separator />
						<BrowseActionBar
							next={
								currentPoemIndex + 1 < sortedPoems.length
									? () =>
											setCurrentPoemIndex(
												currentPoemIndex + 1
											)
									: () => setCurrentPoemIndex(0)
							}
							prev={
								currentPoemIndex - 1 >= 0
									? () =>
											setCurrentPoemIndex(
												currentPoemIndex - 1
											)
									: () =>
											setCurrentPoemIndex(
												sortedPoems.length - 1
											)
							}
							random={() => setCurrentPoemIndex(getRandomPoemIndex())}
							numPoems={sortedPoems.length}
						/>
					</main>
				)}
			</div>
		);
	};
