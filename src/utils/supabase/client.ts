// import { createBrowserClient } from "@supabase/ssr";

import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// export const createClient = () =>
// 	createBrowserClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// 	);

export async function createClerkSupabaseClient() {
	// The `useSession()` hook will be used to get the Clerk `session` object
	const { session } = useSession();

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
