import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
console.log(supabaseKey, supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
