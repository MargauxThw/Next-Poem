import { SlidersHorizontal } from "lucide-react";

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

export function FilterButton() {
	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	// Sanitize the input value to keep only digits
	//     console.log(event.target.value, "CHANGE");
	// 	const sanitisedValue = event.target.value.replace(/[^0-9]/g, "");
	//     event.target.value = sanitisedValue;
	// };

	const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		const pastedData = event.clipboardData.getData("text");
		// Block paste if the data is not a valid integer
		if (!/^\d+$/.test(pastedData)) {
			event.preventDefault();
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<SlidersHorizontal />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit filters</DialogTitle>
					<DialogDescription>
						Use filters to control the poems generated. Click save
						to apply the filters.
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="flex flex-col gap-4 items-start">
					<div className="flex-col gap-2 w-full">
						<Label htmlFor="title">Title</Label>
						<div className="flex flex-row items-center gap-2">
							<Input
								id="title"
								defaultValue=""
								placeholder="Any"
							/>
							<Button variant="secondary">Reset</Button>
						</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<Checkbox id="title-abs" />
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
								defaultValue=""
								placeholder="Any"
							/>
							<Button variant="secondary">Reset</Button>
						</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<Checkbox id="author-abs" />
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
								defaultValue=""
								placeholder="Any"
								// onChange={handleChange}
								onPaste={handlePaste}
							/>
							<Button variant="secondary">Reset</Button>
						</div>
					</div>
				</div>
				<Separator />

				<DialogFooter className="sm:justify-end gap-y-2">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Reset all
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button">Save</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
