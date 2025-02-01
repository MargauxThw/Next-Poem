"use server";
import { Poem, PoemFilter, ErrorMessage } from "./types";

export const fetchNewRandomFilteredPoems = async (
	poemFilter: PoemFilter,
	forSearchDefault?: boolean
): Promise<Array<Poem> | ErrorMessage> => {
	const baseUrl = "https://poetrydb.org";

	let inputFields = "";
	let searchTerms = "";
	if (
		poemFilter.linesStart &&
		poemFilter.linesEnd &&
		poemFilter.linesStart == poemFilter.linesEnd
	) {
		inputFields += "linecount,";
		searchTerms += `${poemFilter.linesStart};`;
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
	if (
		inputFields.length > 0 ||
		poemFilter.linesStart ||
		poemFilter.linesEnd
	) {
		inputFields = inputFields.slice(0, -1);
		if (inputFields.length > 0) {
			responseTail = `/${inputFields}/${searchTerms}`;
		} else {
			responseTail = "/random";
		}
	} else {
		responseTail = forSearchDefault ? "/random/10" : "/random";
	}

	try {
		console.log(baseUrl + responseTail);
		const response = await fetch(baseUrl + responseTail);
		const poems = await response.json();

		// console.log(poems, poems.length);

		if (poems && poems.length > 0) {
			// console.log(poems, baseUrl + responseTail);
			console.log(poemFilter.linesStart, poemFilter.linesEnd, poemFilter);

			if (poemFilter.linesStart || poemFilter.linesEnd) {
				const sortedPoems = poems.filter(
					(poem: Poem) =>
						(!poemFilter.linesStart ||
							poem.lines.length >= poemFilter.linesStart) &&
						(!poemFilter.linesEnd ||
							poem.lines.length <= poemFilter.linesEnd)
				);
				if (sortedPoems.length > 0) {
					return sortedPoems;
				} else {
					return {
						message:
							"No poems could be found. Try adjusting the filters.",
					};
				}
			}
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
