import React from 'react'
import CategoryList from './user/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProducts from '../components/HorizontalCardProducts'




const Home = () => {
  return (
    <>

<CategoryList/>
<BannerProduct/>


<HorizontalCardProducts category={"airpodes"} heading={"Top's Airpods"}/>
<HorizontalCardProducts category={"mouse"} heading={"popular's watchs"}/>

    </>
  )
}

export default Home