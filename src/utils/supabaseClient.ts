import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedSupabaseClient: SupabaseClient | null = null;

const supabaseClient = async (supabaseToken: string) => {
	if (cachedSupabaseClient) {
		return cachedSupabaseClient;
	}

	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			global: {
				headers: {
					...(supabaseToken && {
						Authorization: `Bearer ${supabaseToken}`,
					}),
				},
			},
		}
	);

	cachedSupabaseClient = supabase;

	return supabase;
};

export default supabaseClient;
