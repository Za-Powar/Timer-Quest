import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex flex-col gap-4 p-8 max-w-sm mx-auto mt-20 bg-gray-900 text-white rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <input
        type="email"
        className="p-2 rounded bg-gray-800"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="p-2 rounded bg-gray-800"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
      >
        Login
      </button>

      <button
        onClick={handleSignup}
        className="bg-green-600 hover:bg-green-700 p-2 rounded"
      >
        Sign Up
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
