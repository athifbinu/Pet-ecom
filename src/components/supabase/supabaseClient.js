import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project values
const supabaseUrl = "https://kukgpavfntaljwugfmbt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1a2dwYXZmbnRhbGp3dWdmbWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTQwMTMsImV4cCI6MjA2Mjc5MDAxM30.fhB-JqlP1WqHqg6V0R98AWLEMgF6SED066bVAqzJ8kQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
