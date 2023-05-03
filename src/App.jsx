import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import components for the routes
import {HealthContext} from "./components/AppContext"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Medical from "./pages/Medical/Medical";
import Nutrition from "./pages/Nutrition/Nutrition";
import Settings from "./pages/Settings/Settings";

// Import Middleware
import getCookie from "./utils/getCookie";

function App() {
  const {isAuthenticated, setIsAuthenticated, setUserId} = useContext(HealthContext)


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
              'Cookie': `jwt=${refreshToken}`
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.accessToken) {
                localStorage.setItem("access_token", data.accessToken);
                localStorage.setItem("user_id", data.userId);
                setIsAuthenticated(true);
                setUserId(data.userId);
              } else {
                setIsAuthenticated(false);
              }
            })
            .catch((error) => {
              console.error(error);
              setIsAuthenticated(false);
            });
        } else {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        console.error(error);
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} exact/>
                <Route path="/medical" element={<Medical />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/settings" element={<Settings />} />
              </>
            ) : (
              <Route path="" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
