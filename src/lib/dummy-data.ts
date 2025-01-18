import { Poem } from "./types";

export const samplePoem: Poem = {
	title: "Lorem Ipsum Dolor",
	author: "Lorem Ipsum Dolor Sit Amet",
	lines: [
		"Lorem ipsum dolor sit amet,",
		"consectetur adipiscing elit.",
		"Sed do eiusmod tempor incididunt",
		"ut labore et dolore magna aliqua.",
		"",
		"Lorem ipsum dolor sit amet,",
		"consectetur adipiscing elit.",
		"Sed do eiusmod tempor incididunt",
		"ut labore et dolore magna aliqua.",
		"",
		"Lorem ipsum dolor sit amet,",
		"consectetur adipiscing elit.",
		"Sed do eiusmod tempor incididunt",
		"ut labore et dolore magna aliqua.",
	],
};

export const samplePoemList: Array<Poem> = Array(10).fill(samplePoem);
