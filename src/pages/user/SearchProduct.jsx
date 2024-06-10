import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VerticalCard from '../../components/VerticalCard';


const SearchProduct = () => {
    const query = useLocation();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    console.log('query',query.search)

    const fetchSearchProduct = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                "http://localhost:3000/api/v1/user/search"+query.search,
                {
                    withCredentials:true
                }
            )
            const dataResponse = res.data.data;
            setData(dataResponse)
            setLoading(false)
           console.log("res :",res.data.data)
        } catch (error) {
            console.error("Error fetching search product:", error);
        }
    }

    useEffect(()=>{
        fetchSearchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
        {/**if loading */}
        {
            loading && (
                <p className='text-lg text-center'> Loading ....</p>
            )
        }
      
        <p className='text-lg font-semibold my-3'>Search Results :{data.length}</p>

        {/***if product is === 0 not data found */}
        {
            data.length === 0 && !loading && (
                <h1 className='text-center text-2xl  border rounded m bg-white py-5  font-bold text-slate-500'> No Product Found</h1>
            )
        }

        {/**if data is found then display  */}
        {
            data.length !==0 && !loading && (
              
          <VerticalCard loading={loading} data={data}/>
            )
        }

    </div>
  )
}

export default SearchProduct