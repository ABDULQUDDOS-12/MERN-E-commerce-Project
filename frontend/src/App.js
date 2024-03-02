import './App.css';
import Header from './component/layout/Header.jsx';
import React from 'react';
import webfont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home.jsx';

function App() {
  React.useEffect(() => {
    webfont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] } // corrected spelling of 'Droid Sans'
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes> 
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
