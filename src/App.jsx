import React from "react";
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {

  return (
    <>
      <div className='app bg-slate-900 text-slate-100 min-h-screen'>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App