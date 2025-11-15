import { supabase } from "./supabaseClient";
import kirbyIcon from "./assets/icon.webp"; // <-- Put icon.webp in src/assets/
import "./dashboard.css";

export default function Dashboard({ user, onLogout }) {

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  // Simple fake XP bar value (you will replace with real data later)
  const xpPercent = 60;

  return (
    <div className="min-h-screen bg-[#F0FFF4] font-inter p-6">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">UNLOCK Dashboard</h1>

        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* XP CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your XP</h2>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all" 
            style={{ width: xpPercent + "%" }}
          ></div>
        </div>

        <p className="text-lg">Level: <span className="font-semibold">3</span></p>
      </div>

      {/* MAIN ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Daily Usage */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Daily Time Usage</h2>
          <p className="mb-4 text-gray-600">(Graph coming later)</p>

          <div className="text-gray-700">Loading...</div>
        </div>

        {/* Companion */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Companion</h2>

          <div className="p-4 border border-green-300 rounded-xl min-h-[200px] flex items-center">
            <img src={kirbyIcon} alt="Character" className="w-32" />
          </div>

          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Make Him Move
          </button>
        </div>

      </div>

      {/* UNLOCK HISTORY */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Unlock History</h2>
        <div>Coming soon...</div>
      </div>

    </div>
  );
}
