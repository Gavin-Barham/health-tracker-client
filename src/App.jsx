import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import components for the routes
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

// Import Middleware
import getCookie from "./utils/getCookie";

function App() {
  const token = localStorage.getItem("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

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
                setIsAuthenticated(true);
              } else {
                setIsAuthenticated(false);
              }
            })
            .catch((error) => {
              console.error("Error refreshing token:", error.message);
              setIsAuthenticated(false);
            });
        } else {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error("Error checking token:", error);
        setIsAuthenticated(false);
      });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="" element={<Navigate to="/login" />} />
        )}
      </Routes>
      </Router>
    </div>
  );
}

export default App;
