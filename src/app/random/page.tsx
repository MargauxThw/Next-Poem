"use client";

import { fetchNewRandomFilteredPoems } from "@/lib/actions";
import PoemLayout from "@/components/poem-layout";
import RandomActionBar from "@/components/random-action-bar";
import { Poem, PoemFilter } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { samplePoem } from "@/lib/dummy-data";
import { getLocalStorageFilters } from "@/lib/utils";
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'

import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function Page() {
	// const cookieStore = await cookies();
	// const supabase = createClient(cookieStore);
	// const { data: todos } = await supabase.from('todos').select()

	const [tasks, setTasks] = useState<any[]>([])
	// The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
	const { user } = useUser();
	// The `useSession()` hook will be used to get the Clerk `session` object
	const { session } = useSession();

	// Create a custom supabase client that injects the Clerk Supabase token into the request headers
	function createClerkSupabaseClient() {
		return createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				global: {
					// Get the custom Supabase token from Clerk
					fetch: async (url, options = {}) => {
						const clerkToken = await session?.getToken({
							template: "supabase-next-poems",
						});

						// Insert the Clerk Supabase token into the headers
						const headers = new Headers(options?.headers);
						headers.set("Authorization", `Bearer ${clerkToken}`);

						// Call the default fetch
						return fetch(url, {
							...options,
							headers,
						});
					},
				},
			}
		);
	}

	// Create a `client` object for accessing Supabase data using the Clerk token
	const client = createClerkSupabaseClient();

	// This `useEffect` will wait for the `user` object to be loaded before requesting
	// the tasks for the logged in user
	useEffect(() => {
		if (!user) return;

		async function loadLikes() {
			const { data, error } = await client.from("Likes").select();
			if (!error) setTasks(data);
		}

		loadLikes();
		console.log("TASKS", tasks)
	}, [user]);

	const [poem, setPoem] = useState<Poem | null>(null);
	const [isNew, setIsNew] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const updatePoem = async () => {
		setIsLoading(true);

		const getRandomPoem = (poems: Array<Poem>) => {
			// Select a random poem from the results (excluding the current poem)
			let randomIndex = Math.floor(Math.random() * poems.length);
			let currPoem = poems.find(
				(p): p is Poem => p.title === poem?.title
			);
			const currentPoemIndex = currPoem ? poems.indexOf(currPoem) : -1;

			if (randomIndex == currentPoemIndex) {
				if (poems.length == 1) {
					return {
						message:
							"No poems could be found. Try adjusting the filters.",
					};
				} else if (randomIndex == 0) {
					randomIndex += 1;
				} else {
					randomIndex -= 1;
				}
			}

			const randomPoem = poems[randomIndex];

			return randomPoem;
		};

		const poemList = await fetchNewRandomFilteredPoems(
			getLocalStorageFilters()
		);

		if ("message" in poemList) {
			setHasError(true);
			setErrorMessage(poemList.message);
			setIsLoading(false);
			setIsNew(true);
		} else {
			const newPoem = getRandomPoem(poemList);

			if ("message" in newPoem) {
				setHasError(true);
				setErrorMessage(newPoem.message);
				setIsLoading(false);
				setIsNew(true);
			} else {
				setIsLoading(false);
				setIsNew(true);
				setPoem(newPoem);
				setHasError(false);
				setErrorMessage("");
			}
		}
	};

	useEffect(() => {
		if (poem == null) {
			setPoem(samplePoem);
			updatePoem();
		}
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-full p-4 pb-8 gap-4 sm:p-20 animate-blur-in">
			{poem ? (
				<main
					className={`flex flex-col gap-8 row-start-2 items-start sm:items-start w-full max-w-lg h-fit ${
						isNew ? "animate-blur-in" : ""
					} ${isLoading ? "animate-blur-in-out" : ""}`}
				>
					{hasError ? (
						<p>{errorMessage}</p>
					) : (
						<PoemLayout child={poem} />
					)}
					<Separator />
					<RandomActionBar
						initiateFetch={updatePoem}
						isValidPoem={!hasError}
						isAnimating={isLoading}
					/>
				</main>
			) : (
				<></>
			)}
		</div>
	);
}
