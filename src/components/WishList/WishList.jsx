import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { addToWishList } from '../../Apis/wishListApi'
import axios from 'axios';
import img from '../../assets/react.svg'
import Loading from '../Loading/Loading';
import { addToCart } from '../../Apis/cartApi';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function WishList() {

  let token = localStorage.getItem('userToken')
  let[wishlist , setWishlist] = useState([])
  let { mutate, data, error , isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)

    }
  })

function getFromWishList(){
   axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers:{token}})
   .then(({data})=>{
     setWishlist(data?.data);
   })
   .catch((error)=>{
    console.log(error);
   })
   }

function deleteFromWishList(id){
   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {headers:{token}})
   .then(({data})=>{
     getFromWishList()
   })
   .catch((error)=>{
    console.log(error);
   })
   }


   useEffect(()=>{
    getFromWishList()
   },[])


  return (
    <>
    <div className='m-10 bg-gray-50 p-5'>
      <h1 className='text-3xl font-semibold pb-16 p-5 '> My Wish List</h1>
      {wishlist?.map((product)=>{
        return <div className='flex justify-between items-center border-b-[1px] border-gray-300 pb-4 p-5'>
        <div className="item w-1/3 flex justify-between items-center gap-x-8">
        <img src={product?.imageCover} alt="" className='w-1/2' />
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold'>{product?.title}</h2>
          <span className='text-lg py-2'>{product.price}EGP</span>
          <button  onClick={()=>{deleteFromWishList(product?.id)}} className=' text-red-600 hover:cursor-pointer hover:underline'><i class="fa-solid fa-trash"></i> Remove</button>
        </div>
        </div>
        <div>
          <button onClick={() => { mutate(product?.id); deleteFromWishList(product?.id)}} className='px-8 py-3  rounded-lg border-2 border-green-500 text-center'>add To Cart</button>
        </div>
       </div>
      })}
    </div>
    <Helmet>
  <title>WishList component</title>
  <meta name="description" content="Helmet application" />
</Helmet>
    
    </>
  )
}
