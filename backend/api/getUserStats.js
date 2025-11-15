// api/getUserStats.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.query.userId;

    // Get XP/level
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('xp, level')
      .eq('id', userId)
      .single();

    if (userError) return res.status(500).json({ message: "Error fetching user", userError });

    // Get total time spent per site
    const { data: activityData, error: activityError } = await supabase
      .from('user_activity')
      .select('url, time_spent');

    if (activityError) return res.status(500).json({ message: "Error fetching activity", activityError });

    res.status(200).json({ xp: userData.xp, level: userData.level, activity: activityData });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}