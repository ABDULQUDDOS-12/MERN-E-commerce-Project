import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
const Header = () => {
  return ( 
     <ReactNavbar
     burgerColor = '#eb4034'
     burgerColorHover='#a62d24'
     navColor1 = "white"
     logoHoverSize="10px"
     logoHoverColor="#eb4034"
     link1Text="Home"
     link2Text="Product"
     link3Text="Contact"
     link4Text="About"
     link1Url="/"
     link2Url="/"
     link3Url="/"
     link4Url="/"
     />
    )
}

export default Header