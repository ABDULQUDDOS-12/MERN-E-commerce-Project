import React from 'react'
import playstore from '../../../images/playstore.png'
import Appstore from '../../../images/Appstore.png'
import './Footer.css'
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftfooter">
       <h4>Download our app</h4>
       <p>Download app for android and IOS mobile phone</p>
       <img src={playstore} alt="playstore" />
       <img src={Appstore} alt="Appstore" />
      </div>
      <div className="midfooter">
      <h1>Ecommerce</h1>
      <p>High quality is our first priority</p>
      <p>Copyright 2021 &copy; Abdul Quddos</p>
      </div>
      <div className="rightfooter">
       <h4>Follow us </h4>
       <a href="https://www.linkedin.com/in/abdul-quddos-ansaari/">Linkedin</a>
       <a href="https://www.linkedin.com/in/abdul-quddos-ansaari/">Facebook</a>
       <a href="https://www.linkedin.com/in/abdul-quddos-ansaari/">Youtube</a>
      </div>
    </footer>
    )
}

export default Footer