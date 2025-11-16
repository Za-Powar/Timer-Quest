import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import QuestMascot from "./QuestMascot.jsx"; // <--- NEW mascot

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Stack,
  Divider,
} from "@mui/material";

import StarsIcon from "@mui/icons-material/Stars";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BoltIcon from "@mui/icons-material/Bolt";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { SadClock, NeutralClock, HappyClock } from "./QuestMascot";

/* ============================================================
   MAIN DASHBOARD
============================================================ */
export default function Dashboard({ user, onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #e3f2ff 0, transparent 55%), radial-gradient(circle at bottom right, #ffe6f3 0, transparent 55%), #f8f9ff",
      }}
    >
      {/* Top Navigation Bar */}
      <TopBar user={user} handleLogout={handleLogout} />

      {/* Main Layout */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        <Box sx={{ maxWidth: 1400, mx: "auto" }}>
          <HeroCard />

          {/* Row 2: XP + Usage */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: 3,
              mt: 3,
            }}
          >
            <XPCard />
            <UsageCard />
          </Box>

          {/* Row 3: Companion + Unlocks */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: 3,
              mt: 3,
            }}
          >
            <CompanionCard />
            <UnlockHistoryCard />
          </Box>

          {/* Row 4: Full-width Streak */}
          <Box sx={{ mt: 3 }}>
            <StreakTrackerCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


/* ============================================================
   TOP BAR
============================================================ */
function TopBar({ user, handleLogout }) {
  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Avatar
          sx={{
            bgcolor: "#5C6BF2",
            width: 40,
            height: 40,
            boxShadow: "0 8px 14px rgba(92,107,242,0.4)",
          }}
        >
          <BoltIcon sx={{ color: "white" }} />
        </Avatar>

        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, letterSpacing: 0.5 }}
          >
            Timer <Box component="span" sx={{ color: "#5C6BF2" }}>Quest</Box>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Turn your focus into a daily adventure.
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleLogout}
          sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}


/* ============================================================
   HERO BANNER
============================================================ */
function HeroCard() {
  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(135deg, #5C6BF2 0%, #9B6CF5 40%, #FF7AC4 100%)",
        color: "white",
      }}
    >
      <CardContent sx={{ py: 3, px: { xs: 3, md: 4 } }}>
        <Grid container spacing={3} alignItems="center">
          
          {/* LEFT SIDE */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Welcome back, Adventurer!
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Every focused minute earns XP for you and your companion.
              Keep the streak going!
            </Typography>
            <Chip
              icon={<StarsIcon />}
              label="Daily Quest: Stay under 2h on distractions"
              sx={{
                bgcolor: "rgba(255,255,255,0.22)",
                color: "white",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
              }}
            />
          </Grid>

          {/* RIGHT SIDE STATS */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
              }}
            >
              <MiniStat icon={<QueryStatsIcon fontSize="small" />} label="Focused time" value="2h 15m" />
              <MiniStat icon={<EmojiEventsIcon fontSize="small" />} label="Current streak" value="3 days" />
              <MiniStat icon={<BoltIcon fontSize="small" />} label="XP earned today" value="+120" />
            </Box>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.2}>
      <Avatar sx={{ width: 26, height: 26, bgcolor: "rgba(255,255,255,0.25)", color: "white" }}>
        {icon}
      </Avatar>
      <Typography variant="body2" sx={{ flexGrow: 1 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>{value}</Typography>
    </Stack>
  );
}


/* ============================================================
   XP CARD
============================================================ */
function XPCard() {
  const [stats, setStats] = useState({ lvl: 0, xp: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("No session found", sessionError);
          setLoading(false);
          return;
        }

        const userId = session.user.id;

        // Fetch lvl and xp from the table
        const { data, error } = await supabase
          .from("user_profiles")
          .select("lvl, xp")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("Error fetching XP/Level:", error);
        } else if (data) {
          setStats({ lvl: data.lvl ?? 0, xp: data.xp ?? 0 });
        } else {
          console.warn("No profile found for user");
        }
      } catch (err) {
        console.error("Unexpected error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate progress for progress bar (10 XP per level)
  const xpThisLevel = stats.xp % 10;
  const progress = (xpThisLevel / 10) * 100; // percentage

  if (loading)
    return (
      <Card elevation={2} sx={{ borderRadius: 4, p: 3 }}>
        Loading...
      </Card>
    );

  return (
    <Card elevation={2} sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Your Level
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gain XP by staying focused and finishing quests.
            </Typography>
          </Box>
          <Chip
            label={`Level ${stats.lvl}`}
            color="primary"
            sx={{ borderRadius: 999, fontWeight: 700 }}
          />
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Current XP: {stats.xp}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 999,
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #5C6BF2, #8F6CF7, #FF7AC4)",
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{ mt: 0.5, display: "block", textAlign: "right" }}
            >
              {Math.round(progress)}% towards next level
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


/* ============================================================
   USAGE CARD (CHART)
============================================================ */
function UsageCard() {
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: u } = await supabase.auth.getUser();
      const user = u?.user;
      if (!user) return setLoading(false);

      const { data, error } = await supabase
        .from("usage")
        .select("site, minutes")
        .eq("user_id", user.id);

      if (!error && data) setUsage(data);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <Card elevation={2} sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Time Breakdown (Today)
          </Typography>
          <Chip size="small" label="Tracked sites" sx={{ fontSize: 11 }} />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          See where your time went. Blue bars are your tracked websites.
        </Typography>

        {loading ? (
          <Typography variant="body2" color="text.secondary">Loading...</Typography>
        ) : usage.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No usage yet — start browsing with the extension enabled!
          </Typography>
        ) : (
          <Box sx={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="site" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#5C6BF2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}


/* ============================================================
   COMPANION CARD
============================================================ */
/* ---------- Companion Card with Mood System ---------- */
function CompanionCard() {
  const [level, setLevel] = useState(2); // 1=Sad, 2=Neutral, 3=Happy
  const [lastCheer, setLastCheer] = useState(Date.now());

  // Auto decay of mood
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastCheer;

      if (diff > 5 * 60 * 1000) setLevel(1); 
      else if (diff > 90 * 1000) setLevel(2);
    }, 4000);

    return () => clearInterval(interval);
  }, [lastCheer]);

  const cheer = () => {
    setLevel(3);
    setLastCheer(Date.now());
  };

  const mood = {
    1: <SadClock />,
    2: <NeutralClock />,
    3: <HappyClock />
  };

  const moodLabel = {
    1: "He’s feeling down…",
    2: "He’s doing alright!",
    3: "He’s thrilled! 🤠"
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        height: "100%",
        minHeight: 380,
        background: "linear-gradient(135deg, #ffe6f3 0%, #e7f2ff 50%, #f3e8ff 100%)",
      }}
    >
      <CardContent sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Your Companion
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {moodLabel[level]}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 3 }}>
          {mood[level]}
        </Box>

        <Chip
          label={`Level ${level}`}
          color="primary"
          sx={{ borderRadius: 999, fontWeight: 700, mb: 2 }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            px: 4,
            py: 1.2,
            fontWeight: 700,
            background: "linear-gradient(90deg, #FF7AC4 0%, #FFB86C 100%)",
          }}
          onClick={cheer}
        >
          Cheer Him Up 🎉
        </Button>
      </CardContent>
    </Card>
  );
}



/* ============================================================
   UNLOCK HISTORY CARD
============================================================ */
function UnlockHistoryCard() {
  return (
    <Card elevation={2} sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Recent Unlocks
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This will show new levels, badges, and milestones as Timer Quest evolves.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          No unlocks yet — keep being productive to earn your first badge!
        </Typography>
      </CardContent>
    </Card>
  );
}


/* ============================================================
   STREAK TRACKER CARD
============================================================ */
function StreakTrackerCard() {
  const [streak, setStreak] = useState(3); // initial value from DB
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return setLoading(false);

        const userId = session.user.id;

        const { data, error } = await supabase
          .from("user_profiles")
          .select("streak")
          .eq("id", userId)
          .maybeSingle();

        if (!error && data) {
          setStreak(data.streak ?? 0);
        }

      } catch (err) {
        console.error("Error fetching streak:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  if (loading)
    return (
      <Card elevation={3} sx={{ borderRadius: 4, p: 3 }}>
        Loading...
      </Card>
    );

  const daysThisWeek = streak % 7;
  const progress = (daysThisWeek / 7) * 100;
  const daysToNextMilestone = 7 - daysThisWeek;

  return (
    <Card elevation={3} sx={{ borderRadius: 4, p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Daily Streak
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Keep your streak alive by staying productive every day.
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: "#FF9800",
            width: 36,
            height: 36,
            boxShadow: "0 6px 12px rgba(255,152,0,0.4)",
          }}
        >
          <BoltIcon sx={{ color: "white" }} />
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: 800, color: "#FF9800" }}>
          {streak} days
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 999,
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #FF9800, #FFC947)",
          },
        }}
      />

      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1, textAlign: "right" }}
      >
        {daysToNextMilestone} days to next milestone
      </Typography>
    </Card>
  );
}
