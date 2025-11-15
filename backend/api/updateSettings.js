// api/updateSettings.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, timeLimit, popupFrequency } = req.body;
    const { error } = await supabase
      .from('settings')
      .upsert({ user_id: userId, time_limit: timeLimit, popup_frequency: popupFrequency });

    if (error) return res.status(500).json({ message: "Error updating settings", error });
    res.status(200).json({ message: "Settings updated" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}