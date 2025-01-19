"use client";

import { Poem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";

export default function PoemCard({
	poem,
	openPoem,
	heart,
}: {
	poem: Poem;
	openPoem: (poem: Poem) => void;
	heart?: boolean;
}) {
	return (
		<Card
			className="w-full hover:shadow-lg cursor-pointer"
			onClick={() => openPoem(poem)}
		>
			<CardHeader className="pb-2">
				<CardTitle>{poem.title}</CardTitle>
				<CardDescription className="pb-1">
					<div className="flex flex-row items-center gap-2">
						{poem.author}

						<Badge
							variant={"outline"}
							className="text-muted-foreground px-1"
						>{`${poem.lines.length} lines`}</Badge>
						{heart ? <Heart fill="red" stroke="bg-inherit" className="h-4 -ml-1" /> : <></>}
					</div>
				</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent className="text-left">
				<div className="relative h-fit overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
					<div className="h-12">
						<Markdown rehypePlugins={[rehypeRaw]}>
							{`${poem.lines[0].trimStart()}<br/>`}
						</Markdown>
						<Markdown rehypePlugins={[rehypeRaw]}>
							{`${poem.lines[1].trimStart()}<br/>`}
						</Markdown>
					</div>
				</div>
			</CardContent>
		</Card>
		// <>
		// 	<div className="flex flex-col items-start sm:items-start gap-4">
		// 		<h2 className="decoration-black font-bold text-xl">
		// 			{poem.title}
		// 		</h2>
		// 		<h3 className="italic text-lg">{poem.author}</h3>
		// 	</div>

		// 	<Separator />
		// 	<section>
		// 		{poem.lines.map((str, index) => (
		// 			<Markdown rehypePlugins={[rehypeRaw]} key={index}>
		// 				{`${str.trimStart()}<br/>`}
		// 			</Markdown>
		// 		))}
		// 	</section>
		// </>
	);
}
