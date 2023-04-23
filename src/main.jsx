import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HealthProvider } from './components/AppContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HealthProvider>
          <App />
      </HealthProvider>
  </React.StrictMode>,
)
