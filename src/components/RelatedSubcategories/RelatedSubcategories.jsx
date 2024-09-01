import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function RelatedSubcategories() {

    let [subCategories, setSubCategories] = useState([])
    let {id ,categoryName} = useParams()
    let[isloading , setLoading] = useState(false)

    function getSubCategories(categoryId) {
      setLoading(true)
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
        .then(({ data }) => {
          setLoading(false)
          console.log(data.data);
          setSubCategories(data.data)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
  
        })
    }
  
    useEffect(() => {
      getSubCategories(id)
    }, [])

    if(isloading){
      return <Loading/>
    }
  

  return (
    <> 
     <h2 className='text-2xl text-green-600 text-center font font-semibold m-4'>{categoryName} SubCategories</h2>
    <div className="row gap-6 mx-10"> 
      {subCategories.map((category) => {

        return <div key={category._id} class="lg:w-[30%] md:w-[45%] bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:shadow-green-600 transition-all duration-500">
          <div class="p-5">
            
              <h5 class="mb-2 text-2xl font-bold text-center tracking-tight text-green-600 dark:text-white">{category.name}</h5>

          </div>
        </div>
      })}
    </div>

  </>
  )
}
