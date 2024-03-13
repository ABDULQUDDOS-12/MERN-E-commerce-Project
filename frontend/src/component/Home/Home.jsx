import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import './Home.css'
import Product from './Product.jsx'
import MetaData from '../layout/MetaData.jsx'
import { getProduct } from '../../Actions/productAction.jsx'
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader.jsx'
import { useAlert } from 'react-alert'
// const product = {
//   name:"Blue Tshirt",
//   images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//   price:"RS3000",
//   _id:"Abdul Quddos"
// }

const Home = () => {
  const{loading,error,products,productsCount} = useSelector(state=>state.products)
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      return alert.error("error")
    }
    dispatch(getProduct());
  }, [dispatch,error])
return (
<Fragment>
  {loading ? <Loader/> :      <Fragment>
        <MetaData title={"Ecommerce"}></MetaData>
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
        {products && products.map((product)=><Product product={product}/>)}
        </div>
    </Fragment>}
</Fragment>
  )
}

export default Home