// api/trackTime.js

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, url, timeSpent } = req.body;

    // Save data to Supabase
    const { error } = await supabase
      .from('user_activity')
      .insert({ user_id: userId, url, time_spent: timeSpent });

    if (error) {
      return res.status(500).json({ message: "Error saving data", error });
    }

    res.status(200).json({ message: "Time tracked" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}