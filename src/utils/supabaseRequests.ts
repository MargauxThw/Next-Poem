import { Poem } from "@/lib/types";
import supabaseClient from "./supabaseClient";

export const getMyPoems = async ({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) => {
	const supabase = await supabaseClient(token);

	const { data: myPoems } = await supabase
		.from("likes")
		.select("*")
		.eq("user_id", userId);

	return myPoems;
};

export const getIsLiked = async ({
	userId,
	token,
	poem,
}: {
	userId: string;
	token: string;
	poem: Poem;
}) => {
	const supabase = await supabaseClient(token);

	try {
		const { data, error } = await supabase
			.from("likes")
			.select("*(count)")
			.eq("user_id", userId)
			.eq("poem_title", poem.title)
			.eq("poem_author", poem.author)
			.eq("poem_lines", poem.lines.length);

		if (data && data.length === 0) {
			return false;
		}

		if (error) {
			console.error(
				"There was an error checking if the poem has been liked.",
				error
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(
			"There was an error checking if the poem has been liked.",
			error
		);
		return false;
	}
};

export const likePoem = async ({
	userId,
	token,
	poem,
}: {
	userId: string;
	token: string;
	poem: Poem;
}) => {
	const supabase = await supabaseClient(token);

	try {
		const { error } = await supabase.from("likes").insert([
			{
				user_id: userId,
				poem_title: poem.title,
				poem_author: poem.author,
				poem_lines: poem.lines.length,
			},
		]);

		if (error) {
			console.error(
				"An error occurred and we can't like this poem at this time.",
				error
			);

			return {
				message:
					"An error occurred and we can't like this poem at this time.",
			};
		}
	} catch (error) {
		console.error(
			"An error occurred and we can't like this poem at this time.",
			error
		);

		return {
			message:
				"An error occurred and we can't like this poem at this time.",
		};
	}
};

export const unlikePoem = async ({
	userId,
	token,
	poem,
}: {
	userId: string;
	token: string;
	poem: Poem;
}) => {
	const supabase = await supabaseClient(token);

	try {
		const { error } = await supabase
			.from("likes")
			.delete()
			.eq("user_id", userId)
			.eq("poem_title", poem.title)
			.eq("poem_author", poem.author)
			.eq("poem_lines", poem.lines.length);

		if (error) {
			console.error(
				"An error occurred and we can't unlike this poem at this time.",
				error
			);
			return {
				message:
					"An error occurred and we can't unlike this poem at this time.",
			};
		}
	} catch (error) {
		console.error(
			"An error occurred and we can't unlike this poem at this time.",
			error
		);

		return {
			message:
				"An error occurred and we can't unlike this poem at this time.",
		};
	}
};
