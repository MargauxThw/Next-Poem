"use client";

import { Separator } from "@/components/ui/separator";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterButton } from "@/components/browse-filter-button";
import { useEffect, useMemo, useState } from "react";
import { Poem, PoemFilter, sortingOption } from "@/lib/types";
import { fetchNewRandomFilteredPoems } from "@/lib/actions";

export default function Page() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [poems, setPoems] = useState<Array<Poem>>([]);
	const [sortMode, setSortMode] = useState<sortingOption>(
		sortingOption.titleAZ
	);
	const [isNew, setIsNew] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
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

		const newPoemList = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters(),
			true
		);

		if ("message" in newPoemList) {
			setHasError(true);
			setErrorMessage(newPoemList.message);
			setIsLoading(false);
			setIsNew(true);
		} else {
			setIsLoading(false);
			setIsNew(true);
			setPoems(newPoemList);
			setCurrentPage(1);
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

	const pagesToDisplay = useMemo(() => {
		let toDisplay = [
			...Array(totalPages)
				.keys()
				.map((k) => k + 1),
		];

		if (totalPages < 6) {
			return toDisplay;
		} else {
			if (currentPage <= 3) {
				toDisplay.splice(3, totalPages - 4, -1);
			} else if (totalPages - currentPage <= 2) {
				toDisplay.splice(1, totalPages - 4, -1);
			} else {
				toDisplay.splice(1, currentPage - 2, -1);
				toDisplay.splice(3, totalPages - currentPage - 1, -1);
			}

			return toDisplay;
		}
	}, [totalPages]);

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
						{/* <div className="flex-grow">
							<Input />
						</div>
						<Button>Search</Button> */}

						<FilterButton initiateFetch={() => {}} />
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
									Sort:{" "}
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
				{poems ? (
					poems
						.slice(
							currentPage === 1 ? 0 : currentPage * 10 - 10,
							currentPage * 10 >= poems.length
								? poems.length
								: currentPage * 10
						)
						.map((poem, index) => {
							return <p key={index}>{poem.title}</p>;
						})
				) : (
					<></>
				)}
				{totalPages !== 1 ? (
					<>
						<Separator />

						<Pagination>
							<PaginationContent>
								{currentPage !== 1 ? (
									<PaginationItem>
										<PaginationPrevious
											href="#"
											onClick={(e) =>
												setCurrentPage(currentPage - 1)
											}
										/>
									</PaginationItem>
								) : (
									<PaginationItem>
										<PaginationPrevious
											href="#"
											className={"pointer-events-none"}
											aria-disabled="true"
											tabIndex={-1}
											isDisabled
										/>
									</PaginationItem>
								)}

								{pagesToDisplay.map((pageNumber, index) => (
									<PaginationItem key={index}>
										{pageNumber === -1 ? (
											<PaginationEllipsis />
										) : pageNumber !== currentPage ? (
											<PaginationLink
												href="#"
												onClick={(e) =>
													setCurrentPage(pageNumber)
												}
											>
												{pageNumber}
											</PaginationLink>
										) : (
											<PaginationLink
												href="#"
												className={
													"pointer-events-none border-solid border-black border"
												}
												aria-disabled="true"
												tabIndex={-1}
												isActive
											>
												{pageNumber}
											</PaginationLink>
										)}
									</PaginationItem>
								))}

								{currentPage !== totalPages ? (
									<PaginationItem>
										<PaginationNext
											href="#"
											onClick={(e) =>
												setCurrentPage(currentPage + 1)
											}
										/>
									</PaginationItem>
								) : (
									<PaginationItem>
										<PaginationNext
											href="#"
											className={"pointer-events-none"}
											aria-disabled="true"
											tabIndex={-1}
											isDisabled
										/>
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</>
				) : (
					<></>
				)}
			</main>
		</div>
	);
}
