"use server";
import { Poem, PoemFilter, ErrorMessage } from "./types";

export const fetchNewRandomFilteredPoems = async (
	poemFilter: PoemFilter,
    forSearch?: boolean
): Promise<Array<Poem> | ErrorMessage> => {
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
		responseTail = forSearch ? "/random/30" : "/random";
	}

	try {
		const response = await fetch(baseUrl + responseTail);
		const poems = await response.json();

		if (poems && poems.length > 0) {
			return poems;
		} else {
			return {
				message: "No poems could be found. Try adjusting the filters.",
			};
		}
	} catch (error) {
		return { message: "An error has occured, try again later" };
	}
};
