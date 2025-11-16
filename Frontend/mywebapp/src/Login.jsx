import { useState } from "react";
import { supabase } from "./supabaseClient";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Avatar,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// IMPORTANT — updated import for .jsx file
import QuestMascot from "./QuestMascot.jsx";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else onLogin(data.user);
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Check your email to confirm your account.");
  };

  return (
    <>
      {/* Floating animation keyframes */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        `}
      </style>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #6C63FF 0%, #9A63F9 40%, #FF7AC4 100%)",
          p: 2,
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: 420,
            borderRadius: 5,
            background: "white",
            pt: 4,
            pb: 8,
            px: 4,
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent>
            <Stack spacing={2} alignItems="center">

              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: "#6C63FF",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                }}
              >
                <BoltIcon sx={{ color: "white", fontSize: 34 }} />
              </Avatar>

              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: "#333" }}
              >
                Timer <span style={{ color: "#6C63FF" }}>Quest</span>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Log in to continue your adventure.
              </Typography>

              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    sx={{ color: "#6C63FF" }}
                  />
                }
                label="Remember me"
              />

              {error && (
                <Typography variant="body2" color="error" sx={{ fontWeight: 600 }}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  fontWeight: 800,
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #6C63FF 0%, #9A63F9 50%, #FF7AC4 100%)",
                }}
                onClick={handleLogin}
              >
                LOGIN
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.3,
                  fontWeight: 800,
                  borderRadius: 3,
                  borderColor: "#6C63FF",
                  color: "#6C63FF",
                  "&:hover": { borderColor: "#9A63F9" },
                }}
                onClick={handleSignup}
              >
                SIGN UP
              </Button>

              {/* FLOATING MASCOT */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <QuestMascot />
              </Box>

            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}