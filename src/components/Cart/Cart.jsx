import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { clearCart, deleteFromCart, getFromCart, updateCart } from '../../Apis/cartApi'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
  const queryClient =  useQueryClient()
  let[isloading , setloading] = useState(false)
  let Navigate = useNavigate()
  let[cartItems , setCartItems ] = useState([])
  let { data , isLoading} = useQuery({
    queryKey: ['getCartItems'],
    queryFn: getFromCart,
    select: (data) => {
      // setCartItems(data?.data)
      return data?.data
    },
    
   
  })

  let{data:deletedData , mutate:delMutate , error} = useMutation({mutationFn:deleteFromCart,
    onSuccess:(deletedData)=>{
      setloading(false)
      queryClient.invalidateQueries({ queryKey: ['getCartItems'] }) 
      

    },
    onError:(error)=>{
      setloading(false)
     toast.error(error?.response?.data?.message)
     
    }
  })

  let{data:updatedData , mutate:updateMutate} = useMutation({mutationFn:updateCart
    , onSuccess:(updatedData)=>{console.log(updatedData?.data?.message);
      queryClient.invalidateQueries({ queryKey: ['getCartItems'] })
      setloading(false)
    },
    onError:()=>{console.log(error?.response?.data?.message);
      setloading(false)
    }
  })

  let{data:clearData , mutate:clearMutate , error:clearError}=useMutation({mutationFn:clearCart,
    onSuccess:(clearData)=>{
        console.log(clearData);
        queryClient.invalidateQueries({ queryKey: ['getCartItems'] })
        Navigate('/home')
    },
    onError:(clearError)=>{
      console.log(clearError);
      
    }
  })

  function navigate(cartId){
    Navigate(`/payForm/${cartId}`)
  }




  if(isLoading)
    return<Loading/>
 else if(isloading)
    return<Loading/>

  return (
    <>
      {data?.numOfCartItems ? <>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full  text-left  bg-gray-50 rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class=" text-gray-900  w-full ">
              <tr>
                <h2 className='text-2xl font-semibold pt-10 px-6 uppercase'>Cart Shop</h2>
                <div className='flex justify-between items-center p-6'>
                  <p className='font-semibold text-xl '>Total Price: <span className='text-green-600'> {data?.numOfCartItems} items </span></p>
                  <p className='font-semibold text-xl mx-2'>Total Price: <span className='text-green-600'>{data?.data?.totalCartPrice} EGP</span></p>
                </div>
              </tr>
            </thead>
            <tbody>
              {data?.data?.products.map((ele) => {
                return <tr key={ele?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={ele?.product?.imageCover} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele?.product?.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={()=>{
                        {ele?.count == 1 ? delMutate(ele?.product?._id) : updateMutate({id:ele?.product?._id , count: ele?.count?ele?.count-1:ele})}
                        setloading(true)
                      }}
                        class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{ele?.count}</span>
                      </div>
                      <button onClick={()=>{ {ele?.count == ele?.product?.imageCover ? toast.error('can not add more'): updateMutate({id:ele?.product?._id , count:ele?.count+1})}
                    setloading(true)}} class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele.price}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=>{delMutate(ele?.product?._id); setloading(true)}} className="font-medium bg-red-600 dark:bg-red-500 px-4 py-3 text-slate-100 rounded-xl">Remove</button>
                  </td>
                </tr>
              })}
            </tbody>
            <div className='p-5 flex gap-x-7'>
              <button onClick={clearMutate} className='py-3 px-6 text-white rounded-lg bg-green-600 my-5 '>Clear</button>
                <button onClick={()=>{navigate(data?.data?._id)}} className='px-6 my-5 py-3 bg-green-600 text-white rounded-lg '>Pay Online</button>
                

            </div>
          </table>
        </div>

      </> : <><div className='bg-gray-50 p-6'>
      <div className=' text-3xl rounded-lg m-15 font-semibold p-6'>Cart Shop </div>
        <div className='flex justify-between items-center p-6 w-1/2'>
          <p className='font-semibold text-xl'>Total Price: <span className='text-green-600'>0</span></p>
          <p className='font-semibold text-xl'>Total Price: <span className='text-green-600'>0 EGP</span></p>
        </div>
      </div>
      </>}
      <Helmet>
  <title>Cart component</title>
  <meta name="description" content="Helmet application" />
</Helmet>

    </>
    
  )
}
