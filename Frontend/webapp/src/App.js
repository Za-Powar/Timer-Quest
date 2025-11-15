import React, { useState } from "react";
import Auth from "./Auth";

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Auth onAuth={setUser} />;

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>Your user ID: {user.id}</p>
    </div>
  );
}

export default App;
