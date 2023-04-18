import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import components for the routes
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";

// Import Middleware
import getCookie from "./assets/getCookie";

function App() {
  const token = localStorage.getItem("access_token");
  const [authenticated, setAuthenticated] = useState(token ? true : false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
  
    if (token) {
      fetch("http://localhost:3030/auth/check-token", {
        method: "POST",
        headers: {
          'Authorization': token,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          const refreshToken = getCookie("jwt");
          fetch("http://localhost:3030/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Cookie': `refreshToken=${refreshToken}`
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.accessToken) {
                localStorage.setItem("access_token", data.accessToken);
                setAuthenticated(true);
              } else {
                setAuthenticated(false);
              }
            })
            .catch((error) => {
              console.error("Error refreshing token:", error);
              setAuthenticated(false);
            });
        } else {
          setAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error("Error checking token:", error);
        setAuthenticated(false);
      });
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      {authenticated ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
