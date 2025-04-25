import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qwcmonuvqulrpvfqdswx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3Y21vbnV2cXVscnB2ZnFkc3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyODQxNDEsImV4cCI6MjA1NDg2MDE0MX0.cx3LmiFYxZjWI9RMhh9b_YsWM5idWODniRBS1Da93Ew";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
