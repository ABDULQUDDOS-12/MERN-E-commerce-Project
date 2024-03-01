import './App.css';
import Header from './component/layout/Header.jsx';
import React from 'react';
import webfont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  React.useEffect(() => {
    webfont.load({
      google: {families: ["Roboto", "Drold Sans", "Chilanka"]}
    });
  }, []);
  return (
    <Router>
      <Header />
      <Footer/>
    </Router>
  );
}
export default App;