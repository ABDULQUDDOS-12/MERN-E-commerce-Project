import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg"
import './Home.css'
import Product from './Product.jsx'
const product = {
  name:"Blue Tshirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"RS3000",
  _id:"Abdul Quddos"
}
const Home = () => {
return (
    <Fragment>
        <div className="banner">
            <p>Welcome to ecommerce</p>
            <h1>Find the amazing products below</h1>
            <a href="#container">
              <button>
                scroll <CgMouse/>
              </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Product</h2>
        <div className="container" id="container">
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        <Product product={product}></Product>
        </div>
    </Fragment>
  )
}

export default Home