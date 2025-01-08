"use server";
import { Poem, PoemFilter, ErrorMessage } from "./types";

export const fetchNewRandomPoem = async (): Promise<Poem | ErrorMessage> => {
	try {
		const response = await fetch("https://poetrydb.org/random");
		const poems: Poem[] = await response.json();
		return poems[0];
	} catch (error) {
		return { message: "An error has occured, try again later" };
	}
};

export const fetchNewRandomFilteredPoems = async (
	poemFilter: PoemFilter
): Promise<Poem | ErrorMessage> => {
	const baseUrl = "https://poetrydb.org";

	let inputFields = "";
	let searchTerms = "";
	if (poemFilter.linecount) {
		inputFields += "linecount,";
		searchTerms += `${poemFilter.linecount};`;
	}

	if (poemFilter.authorText) {
		poemFilter.authorText = poemFilter.authorText.replace(" ", "%20");
		inputFields += "author,";
		searchTerms += `${poemFilter.authorText}${
			poemFilter.authorAbs != null
				? poemFilter.authorAbs == true
					? ":abs"
					: ""
				: ""
		};`;
	}

	if (poemFilter.titleText) {
		poemFilter.titleText = poemFilter.titleText.replace(" ", "%20");
		inputFields += "title,";
		searchTerms += `${poemFilter.titleText}${
			poemFilter.titleAbs != null
				? poemFilter.titleAbs == true
					? ":abs"
					: ""
				: ""
		};`;
	}

	let responseTail = "";
	if (inputFields.length > 0) {
		inputFields = inputFields.slice(0, -1);
		responseTail = `/${inputFields}/${searchTerms}`;
	} else {
		responseTail = "/random";
	}

	try {
		console.log(baseUrl + responseTail);
		const response = await fetch(baseUrl + responseTail);
		const poems = await response.json();

		if (poems && poems.length > 0) {
			// Select a random poem from the results
			const randomIndex = Math.floor(Math.random() * poems.length);
			const randomPoem = poems[randomIndex];

			return randomPoem;
		} else {
			return {
				message: "No poems could be found. Try adjusting the filters.",
			};
		}
	} catch (error) {
		console.log(error);
		// throw new Error("An error has occured, try again later");
		return { message: "An error has occured, try again later" };
	}

	// const data = await fetch(fetchUrl);
	// const newPoemArray: Poem[] = await data.json();
	// console.log(newPoemArray);

	// return newPoemArray[0];
};
