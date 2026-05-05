import { useState } from "react";
import Auth from "./auth.jsx";
import Home from "./home.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(accessToken) {
    setToken(accessToken);
  }

  async function handleLogout() {
    try {
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      console.log("Logout failed");
    }
    localStorage.removeItem("token");
    setToken(null);
  }

  if (!token) return <Auth onLogin={handleLogin} />;
  return <Home onLogout={handleLogout} />;
}

export default App;