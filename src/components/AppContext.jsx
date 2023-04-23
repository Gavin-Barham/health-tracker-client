import React, { createContext, useState } from 'react'

const HealthContext = createContext()

const HealthProvider = ({ children }) => {
    const token = localStorage.getItem("access_token");
    const id = localStorage.getItem("user_id");
    const date = new Date()
    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false)
    const [userId, setUserId] = useState(id)
    const [dashboard, setDashboard] = useState({})
    const [timeSpan, setTimeSpan] = useState([date,date])

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
        dashboard,
        setDashboard,
        timeSpan,
        setTimeSpan,
    }

    return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>
}

export {HealthContext, HealthProvider}