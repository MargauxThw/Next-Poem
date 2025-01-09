"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export function FilterButton({ newRandomPoem }: { newRandomPoem: () => void }) {
	const [titleText, setTitleText] = useState<string>("");
	const [titleAbs, setTitleAbs] = useState<boolean>(false);
	const [authorText, setAuthorText] = useState<string>("");
	const [authorAbs, setAuthorAbs] = useState<boolean>(false);
	const [linesText, setLinesText] = useState<string>("");
	const [closedBySave, setClosedBySave] = useState<boolean>(false);

	const initialiseFilters = () => {
		setTitleText(localStorage.getItem("titleText") ?? "");
		setTitleAbs(localStorage.getItem("titleAbs") === "true");

		setAuthorText(localStorage.getItem("authorText") ?? "");
		setAuthorAbs(localStorage.getItem("authorAbs") === "true");

		setLinesText(localStorage.getItem("linesText") ?? "");
	};

	useEffect(() => {
		initialiseFilters();
	}, []);

	const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		const pastedData = event.clipboardData.getData("text");
		// Block paste if the data is not a valid integer
		if (!/^\d+$/.test(pastedData)) {
			event.preventDefault();
		}
	};

	const resetAll = () => {
		resetTitle();
		resetAuthor();
		resetLines();
	};

	// Commented calls based on assumption that clicking reset should not also save
	const resetTitle = () => {
		setTitleText("");
		// localStorage.setItem("titleText", "");
		setTitleAbs(false);
		// localStorage.setItem("titleAbs", "false");
	};

	const resetAuthor = () => {
		setAuthorText("");
		// localStorage.setItem("authorText", "");
		setAuthorAbs(false);
		// localStorage.setItem("authorAbs", "false");
	};

	const resetLines = () => {
		setLinesText("");
		// localStorage.setItem("linesText", "");
	};

	const saveFilters = () => {
		setClosedBySave(true);
		localStorage.setItem("titleText", titleText);
		localStorage.setItem("titleAbs", titleAbs.toString());
		localStorage.setItem("authorText", authorText);
		localStorage.setItem("authorAbs", authorAbs.toString());
		localStorage.setItem("linesText", linesText);
		newRandomPoem();
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setClosedBySave(false);
		} else if (!closedBySave) {
			initialiseFilters();
		}
	};

	return (
		<Dialog onOpenChange={(open) => handleOpenChange(open)}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<SlidersHorizontal />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-md"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Edit filters</DialogTitle>
					<DialogDescription>
						Filters control the poems generated across the site.
						Click save to apply the filters.
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="flex flex-col gap-4 items-start">
					<div className="flex-col gap-2 w-full">
						<Label htmlFor="title">Title</Label>
						<div className="flex flex-row items-center gap-2">
							<Input
								id="title"
								placeholder="Any"
								value={titleText}
								onChange={(e) => {
									setTitleText(e.target.value);
								}}
							/>
							<Button variant="secondary" onClick={resetTitle}>
								Reset
							</Button>
						</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<Checkbox
							id="title-abs"
							checked={titleAbs}
							onCheckedChange={(e) => {
								setTitleAbs(e as boolean);
							}}
						/>
						<Label
							htmlFor="title-abs"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Exact title match
						</Label>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col gap-4 items-start">
					<div className="flex-col gap-2 w-full">
						<Label htmlFor="author">Author</Label>
						<div className="flex flex-row items-center gap-2">
							<Input
								id="author"
								placeholder="Any"
								value={authorText}
								onChange={(e) => {
									setAuthorText(e.target.value);
								}}
							/>
							<Button variant="secondary" onClick={resetAuthor}>
								Reset
							</Button>
						</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<Checkbox
							id="author-abs"
							checked={authorAbs}
							onCheckedChange={(e) => {
								setAuthorAbs(e as boolean);
							}}
						/>
						<Label
							htmlFor="author-abs"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Exact author match
						</Label>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col gap-4 items-start">
					<div className="flex-col gap-2 w-full">
						<Label htmlFor="lines">Lines in poem</Label>
						<div className="flex flex-row items-center gap-2">
							<Input
								type="number"
								id="lines"
								placeholder="Any"
								onPaste={handlePaste}
								value={linesText}
								onChange={(e) => {
									setLinesText(e.target.value);
								}}
							/>
							<Button variant="secondary" onClick={resetLines}>
								Reset
							</Button>
						</div>
					</div>
				</div>
				<Separator />

				<DialogFooter className="sm:justify-end gap-y-2">
					{/* <DialogClose asChild> */}
					<Button
						type="button"
						variant="secondary"
						onClick={resetAll}
					>
						Reset all
					</Button>
					{/* </DialogClose> */}
					<DialogClose asChild>
						<Button type="button" onClick={saveFilters}>
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
