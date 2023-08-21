import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {ProjectContextProvider} from './context/ProjectContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
          <App />
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
