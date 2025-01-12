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
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { FilterButton } from "@/components/filter-button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Page() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(5);
	const [pagesToDisplay, setPagesToDisplay] = useState<Array<number>>([]);

	useEffect(() => {
		let toDisplay = [];

		if (totalPages < 4) {
			setPagesToDisplay([
				...Array(totalPages)
					.keys()
					.map((k) => k + 1),
			]);
		} else {
			toDisplay.push(1);

			if (currentPage !== 1 && currentPage !== totalPages) {
				toDisplay.push(currentPage);
				if (currentPage !== 2) {
					toDisplay.splice(1, 0, -1);
					if (totalPages - currentPage > 1) {
						toDisplay.splice(3, 0, -1);
					}
				} else if (totalPages - currentPage > 1) {
					toDisplay.splice(2, 0, -1);
				}
			} else {
				toDisplay.splice(1, 0, -1);
			}

			toDisplay.push(totalPages);

			setPagesToDisplay([...toDisplay]);
		}
	}, [totalPages, currentPage]);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
			<main
				className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit`}
			>
				<div className="flex flex-col items-start sm:items-start gap-4 w-full">
					<h2 className="decoration-black font-bold text-xl">
						Browse poems
					</h2>
					<div className="flex flex-row gap-2 w-full">
						<div className="flex-grow">
							<Input />
						</div>
						<Button>Search</Button>

						<FilterButton newRandomPoem={() => {}} />
					</div>
				</div>
				<Separator />
				{totalPages !== 1 ? (
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
										<PaginationLink href="#" onClick={(e) => setCurrentPage(pageNumber)}>
											{pageNumber}
										</PaginationLink>
									) : (
										<PaginationLink
											href="#"
											className={"pointer-events-none border-solid border-black border"}
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
				) : (
					<></>
				)}
			</main>
		</div>
	);
}
