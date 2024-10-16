import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App.jsx'
import Stats from './components/Stats.jsx'
import Home from './components/Home.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="stats" element={<Stats />} />
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </StrictMode>
)
