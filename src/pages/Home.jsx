import React from 'react'
import CategoryList from './user/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProducts from '../components/HorizontalCardProducts'
import VerticalCardProducts from '../components/VerticalCardProducts'





const Home = () => {
  return (
    <>

<CategoryList/>
<BannerProduct/>


<HorizontalCardProducts category={"airpodes"} heading={"Top's Airpods"}/>
<HorizontalCardProducts category={"watches"} heading={"popular's watchs"}/>

<VerticalCardProducts category={'mobiles'} heading={"Mobile"}/> 
<VerticalCardProducts category={'mouse'} heading={"Mouse"}/> 
<VerticalCardProducts category={'televisions'} heading={"Televisions"}/>
<VerticalCardProducts category={"camera"} heading={"Camera & Photography"}/> 
<VerticalCardProducts category={"earphones"} heading={"Wired Earphones"}/> 
<VerticalCardProducts category={"speakers"} heading={"bluetooth Speaker"}/> 
<VerticalCardProducts category={"refrigerator"} heading={"Refrigerator"}/> 
<VerticalCardProducts category={"trimmers"} heading={"Trimmers"}/> 



 
    </>
  )
}

export default Home