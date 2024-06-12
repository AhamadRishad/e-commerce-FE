// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import VerticalCard from '../../components/VerticalCard';
// // import CategoryWiseProductDisplay from '../../components/CategoryWiseProductDisplay';

// const CategoryProduct = () => {
//     const params = useParams()
//     // {params?.categoryName}
//     const [productCategory, setProductCategory] = useState([]);
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const [selectCategory,setSelectCategory] = useState({})
//     const [filterCategoryList,setFilterCategoryList] = useState([])

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.post(
//           "http://localhost:3000/api/v1/user/filter-product",
//           {
//             category: filterCategoryList,
//           },
//           {
//             withCredentials: true,
//           }
//         );


//         const dataResponse = res.data;
//         setLoading(false);
//         setData(dataResponse || [])
//         console.log("res :",res)

//       } catch (error) {
        
//       }
//     }

//       useEffect(()=>{
//       fetchData()
//     },[filterCategoryList])


//     useEffect(() => {
//       const categories = async () => {
//         try {
//           const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
//           const categoryData = res.data;
//           setProductCategory(categoryData);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       categories();
//     }, []);

  


//     const handleSelectCategory = (e) => {
//       const {name , value , checked} = e.target 

//       setSelectCategory((preve) => {
//         return {
//           ...preve,
//           [value] : checked
//         }
//       })

//       // console.log("select Category :",name,value,checked)
//     }

//     // console.log("selectCategory :",selectCategory)
//     useEffect(()=>{
//     const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
//       // console.log(categoryName)
//       if(selectCategory[categoryKeyName]){
//         return categoryKeyName
//       }
//       return null
//     }).filter(el => el)
//     setFilterCategoryList(arrayOfCategory)

//     // console.log("selected catogory :", arrayOfCategory)
//     },[selectCategory])
//   return (
//     <div className='container mx-auto p-4'>

//     {/***desktop version */}
//     <div className='hidden lg:grid grid-cols-[200px,1fr]'>
//         {/***left side */}
//         <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
//              {/**sort by */}
//              <div className=''>
//                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

//                  <form className='text-sm flex flex-col gap-2 py-2'>
//                      <div className='flex items-center gap-3'>
//                        <input type='radio' name='sortBy'/>
//                      {/** checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} */}
//                        <label>Price - Low to High</label>
//                      </div>

//                      <div className='flex items-center gap-3'>
//                        <input type='radio' name='sortBy' />
//                       {/** checked={sortBy === 'dsc' onChange={handleOnChangeSortBy} value={"dsc"}}*/}
//                        <label>Price - High to Low</label>
//                      </div>
//                  </form>
//              </div>


//              {/**filter by */}
//              <div className=''>
//                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

//                  <form className='text-sm flex flex-col gap-2 py-2'>
//                      {
//                        productCategory.map((categoryName,index)=>{
//                          return(
//                            <div key={index} className='flex items-center gap-3'>
//                               <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]}  value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}  /> {/**  onChange={handleSelectCategory}  */}
//                               <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                            </div>
//                          )
//                        })
//                      }
//                  </form>
//              </div>


//         </div>


//          {/***right side ( product ) */}
//          {/* <div className='px-4'>
//            <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

//           <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
//            {
//                data.length !== 0 && !loading && (
//                  <VerticalCard data={data} loading={loading}/>
//                )
//            }
//           </div>
//          </div> */}

//          <div>
//            {
//             data.length !== 0 &&!loading && (
//               <VerticalCard data={data} loading={loading}/>
//             )
//            }


//          </div>

             



//     </div>
    
//  </div>
//   )
// }

// export default CategoryProduct


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VerticalCard from '../../components/VerticalCard';

const CategoryProduct = () => {
    const params = useParams();
    const [productCategory, setProductCategory] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll('category')
    // console.log("urlCategoryListInArray :",urlCategoryListInArray)
    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(categoryName => {
        urlCategoryListObject[categoryName] = true;
    })
    // console.log("urlCategoryListObject:",urlCategoryListObject)
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);

    const [sortBy , setSortBy] = useState("")
    // console.log("sortBy :",sortBy)

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/filter-product",
                { category: filterCategoryList },
                { withCredentials: true }
            );
            const dataResponse = res.data;
            setData(dataResponse.data);
            setLoading(false)
            // console.log("dataResponse:", dataResponse);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
                const categoryData = res.data;
                setProductCategory(categoryData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map((categoryKeyName) => (selectCategory[categoryKeyName] ? categoryKeyName : null))
            .filter((el) => el);
        setFilterCategoryList(arrayOfCategory);
        const urlFormat = arrayOfCategory.map(
          (el,index)=>{
            if((arrayOfCategory.length -1) === index){
              return `category=${el}`
            }
            return `category=${el}&&`
          }
        )
        // console.log("urlFormat :",urlFormat)
        navigate("/product-category?"+urlFormat.join(""))
    }, [selectCategory]);

    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'ascending'){
        setData(preve => preve.sort((a,b)=>a.price - b.price))
      }

      if(value === 'descending'){
        setData(preve => preve.sort((a,b)=>b.price - a.price))
      }
    }

    useEffect(()=>{

    },[sortBy])

    return (
        <div className='container mx-auto p-4'>
          {/***desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
              {/***left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'ascending'} value={'ascending'} onChange={handleOnChangeSortBy}/>
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'descending'} value={'descending'} onChange={handleOnChangeSortBy}/>
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((categoryName, index) => (
                                <div key={index} className='flex items-center gap-3'>
                                  {/**SET LOADING TEMPLATE IN FUTURE TO 'category' */}
                                    <input
                                        type='checkbox'
                                        name='category'
                                        checked={selectCategory[categoryName?.value] || false}
                                        value={categoryName?.value}
                                        id={categoryName?.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
                <div className='px-4'>
                  <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
                 <div className=' min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                   {/* {loading ? (
                        <p>Loading...</p>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        <VerticalCard data={data} loading={loading} />
                    ) : (
                        <p>No products found</p>
                    )} */}
                    {
                      data.length !== 0 && (
                        <VerticalCard data={data} loading={loading}/>
                      )
                    }
                 </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;






// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import VerticalCard from '../../components/VerticalCard';

// const CategoryProduct = () => {
//     const params = useParams();
//     const [productCategory, setProductCategory] = useState([]);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectCategory, setSelectCategory] = useState({});
//     const [filterCategoryList, setFilterCategoryList] = useState([]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.post(
//                 "http://localhost:3000/api/v1/user/filter-product",
//                 { category: filterCategoryList },
//                 { withCredentials: true }
//             );
//             const dataResponse = res.data;
//             setData(dataResponse || []);
//             console.log("res:", res);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setData([]);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchData();
//     }, [filterCategoryList]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
//                 const categoryData = res.data;
//                 setProductCategory(categoryData);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     const handleSelectCategory = (e) => {
//         const { value, checked } = e.target;
//         setSelectCategory((prev) => ({
//             ...prev,
//             [value]: checked,
//         }));
//     };

//     useEffect(() => {
//         const arrayOfCategory = Object.keys(selectCategory)
//             .map((categoryKeyName) => (selectCategory[categoryKeyName] ? categoryKeyName : null))
//             .filter((el) => el);
//         setFilterCategoryList(arrayOfCategory);
//     }, [selectCategory]);

//     return (
//         <div className='container mx-auto p-4'>
//             {/***desktop version */}
//             <div className='hidden lg:grid grid-cols-[200px,1fr]'>
//                 {/***left side */}
//                 <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
//                     {/**sort by */}
//                     <div>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - Low to High</label>
//                             </div>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - High to Low</label>
//                             </div>
//                         </form>
//                     </div>

//                     {/**filter by */}
//                     <div>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             {productCategory.map((categoryName, index) => (
//                                 <div key={index} className='flex items-center gap-3'>
//                                     <input
//                                         type='checkbox'
//                                         name='category'
//                                         checked={selectCategory[categoryName?.value] || false}
//                                         value={categoryName?.value}
//                                         id={categoryName?.value}
//                                         onChange={handleSelectCategory}
//                                     />
//                                     <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                                 </div>
//                             ))}
//                         </form>
//                     </div>
//                 </div>

//                 {/***right side ( product ) */}
//                 <div>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : Array.isArray(data) && data.length > 0 ? (
//                         <VerticalCard data={data} loading={loading} />
//                     ) : (
//                         <p>No products found</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryProduct;













// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import VerticalCard from '../../components/VerticalCard';
// // import CategoryWiseProductDisplay from '../../components/CategoryWiseProductDisplay';

// const CategoryProduct = () => {
//     const params = useParams();
//     const [productCategory, setProductCategory] = useState([]);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectCategory, setSelectCategory] = useState({});

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
//                 setProductCategory(res.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const res = await axios.post(
//                     "http://localhost:3000/api/v1/user/category-wise-products",
//                     { category: params?.categoryName },
//                     { withCredentials: true }
//                 );
//                 const dataResponse = res.data;
//                 setData(dataResponse.data);
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//                 console.error("Error fetching category products:", error);
//             }
//         };

//         if (params?.categoryName) {
//             fetchData();
//         }
//     }, [params?.categoryName]);

//     const handleSelectCategory = (e) => {
//         const { value, checked } = e.target;

//         setSelectCategory((prev) => ({
//             ...prev,
//             [value]: checked,
//         }));

//         // Additional logic if needed based on selected categories
//     };

//     console.log("Selected Categories:", selectCategory);

//     return (
//         <div className='container mx-auto p-4'>
//             {/***desktop version */}
//             <div className='hidden lg:grid grid-cols-[200px,1fr]'>
//                 {/***left side */}
//                 <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
//                     {/**sort by */}
//                     <div className=''>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - Low to High</label>
//                             </div>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - High to Low</label>
//                             </div>
//                         </form>
//                     </div>

//                     {/**filter by */}
//                     <div className=''>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             {productCategory.map((categoryName, index) => (
//                                 <div key={index} className='flex items-center gap-3'>
//                                     <input type='checkbox' name={"category"} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
//                                     <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                                 </div>
//                             ))}
//                         </form>
//                     </div>
//                 </div>

//                 {/***right side ( product ) */}
//                 <div>
//                     {data.length !== 0 && !loading && <VerticalCard data={data} loading={loading} />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryProduct;






















// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import CategoryWiseProductDisplay from '../../components/CategoryWiseProductDisplay';

// const CategoryProduct = () => {
//     // const { categoryName } = useParams();
//     const params = useParams()
//     const [productCategory, setProductCategory] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3000/api/v1/admin/categories");
//                 setProductCategory(res.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     return (
//         <div className='container mx-auto p-4'>
//             {/***desktop version */}
//             <div className='hidden lg:grid grid-cols-[200px,1fr]'>
//                 {/***left side */}
//                 <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
//                     {/**sort by */}
//                     <div>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - Low to High</label>
//                             </div>
//                             <div className='flex items-center gap-3'>
//                                 <input type='radio' name='sortBy' />
//                                 <label>Price - High to Low</label>
//                             </div>
//                         </form>
//                     </div>

//                     {/**filter by */}
//                     <div>
//                         <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
//                         <form className='text-sm flex flex-col gap-2 py-2'>
//                             {
//                                 productCategory.map((categoryName, index) => (
//                                     <div className='flex items-center gap-3' key={index}>
//                                         <input type='checkbox' name={"category"} />
//                                         <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                                     </div>
//                                 ))
//                             }
//                         </form>
//                     </div>
//                 </div>

//                 {/***right side (product) */}
//                 <div>
//                     {params?.categoryName && (
//                         <CategoryWiseProductDisplay category={params?.categoryName} heading={"Recommended Products"} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CategoryProduct;
