import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zhvgwibpbktdjtjlowwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpodmd3aWJwYmt0ZGp0amxvd3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzOTcyMzcsImV4cCI6MjAxNjk3MzIzN30.0dTnJ5TOwnuDv1GtWk_Ac0fBjZP2nJYHXixHK3xp1d0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
