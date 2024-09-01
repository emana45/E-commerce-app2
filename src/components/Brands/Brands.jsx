import axios from 'axios';
import React, { useEffect, useState } from 'react'
import reactImg from '../../assets/error.svg'
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Brands() {
  let[isloading , setLoading] = useState(false)
  let [brands, setBrands] = useState([])
  let [close , setClose] = useState(false)
  let [modal , setmodal] = useState(true)

  function closeModal(){
    setClose(!close)
  }

  function getBrands() {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)

      })
  }



  useEffect(() => {
    getBrands()
  }, [])

  if(isloading){
    return <Loading/>
  }

  return (
    <>
      <div className="row g-4">
        {brands.map((brand) => {
          return <><div key={brand._id} onClick={()=>{displayModal(brand.image , brand.name)}} className="brand cursor-pointer border border-1 border-gray-200 rounded-lg justify-center w-[22%] flex flex-col m-4 p-6 items-center hover:shadow-lg hover:shadow-green-500 transition-all duration-500">
              <img src={brand.image} alt="" />
              <span className=''>{brand.name}</span>
            </div>
          </>

        })}
      </div>
      <Helmet>
        <title>Brands component</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
  
</>
  )

}

{/* <div className='h-screen bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0'>
        <div className='flex justify-center'>
  <div className='modal w-1/3 border border-1 border-gray-300 rounded-lg bg-white mt-10'>
         <div className='modal-header  border-b-[1px] border-gray-300 cursor-pointer 'dir="rtl">
         <i class="fa-solid fa-xmark  me-auto p-4 text-gray-600 " onClick={closeModal}></i>
         </div>
         <div className='modal-body p-6 flex justify-between items-center '>
                <div>
                 <h3 className='text-xl font-semibold py-2 text-green-600'>{brandName}</h3>
                 <span className='text-gray-800 '>{brandName}</span>
                </div>
                <div>
                 <img src={srcImg} alt="" />
                </div>
         </div>
         <div className='modal-footer p-2  border-t-[1px] border-gray-300' dir="rtl">
            <button className='px-5 py-2 bg-gray-600 text-white text-center rounded-lg me-auto' onClick={()=>{closeModal()}}>close</button>
         </div>
       </div>
  </div> 
     </div> */}