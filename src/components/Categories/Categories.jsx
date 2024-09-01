import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import RelatedSubcategories from '../RelatedSubcategories/RelatedSubcategories';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Categories() {

  let [categories, setcategories] = useState([])
  let[isloading , setLoading] = useState(false)

  function getCategories() {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        console.log(data.data);
        setcategories(data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  } 
  

  useEffect(() => {
    getCategories()
  }, [])

  if(isloading){
    return <Loading/>
  }



  return (
    <>
      <div className="row gap-6 mx-10">
        {categories.map((category) => {
          return<><Link to={`/relatedSubCategories/${category._id}/${category.name}`} key={category._id} class="lg:w-[30%] md:w-[45%] bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:shadow-green-600 transition-all duration-500">
            
              <img class="rounded-t-lg w-full h-[300px] object-cover" src={category.image} alt="" />

            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold text-center tracking-tight text-green-600 dark:text-white">{category.name}</h5>
            </div>
          </Link>
          </> 
        })}
      </div>
      <Helmet>
  <title>Categories component</title>
  <meta name="description" content="Helmet application" />
</Helmet>

    </>
  )
}
