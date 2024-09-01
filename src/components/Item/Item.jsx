import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { addToCart } from '../../Apis/cartApi';
import { addToWishList } from '../../Apis/wishListApi';
import { toast } from 'react-toastify';

export default function Item({product}) {
    let[wishItem , setWishItem] = useState(false)
    let [isloading, setLoading] = useState(false)
    let [products, setProducts] = useState([])
    let { mutate, data, error } = useMutation({
      mutationFn: addToCart,
      onSuccess: (data) => {
        toast.success(data?.data?.message)
  
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
  
      }
    })
  
    let { data: addedData, mutate: addMutate, error: addedError } = useMutation({
      mutationFn: addToWishList,
      onSuccess: (addedData) => {
        toast.success('it has been added successfully!')
      },
      onError: (addedError) => {
        console.log(addedError);
  
      }
    })

    function makeWish(){
        setWishItem(!wishItem)
      }

      
  return (
    <>
    <div key={product.id} className="md:w-1/2 lg:w-1/4 my-4 p-2">
            <div className="product transition-all duration-500 hover:shadow-lg hover:shadow-green-600">
              <Link to={`/productDetails/${product.id}`}>
                <div className='cursor-pointer'>
                  <div className='flex justify-center items-center py-4'>
                    <img src={product.imageCover} alt={product.title} className='w-3/4' />
                  </div>
                  <span className='text-green-600 p-2'>{product.category.name}</span>
                  <h3 className='p-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className='flex justify-between items-center p-2'>
                    <span className='text-light'>{`${product.price} EGP`}</span>
                    <span className='text-gray-600'><i className="fas fa-star text-yellow-300"></i>{product.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <div className='px-2' dir='rtl'>
                <span onClick={()=>{addMutate(product?.id); makeWish()}} ><i className={`fa-solid fa-heart text-2xl pt-2 ms-auto cursor-pointer ${wishItem?'text-red-600':'text-black'}`}></i></span>
              </div>

              <div className='flex justify-center items-center'>
                <button onClick={() => { mutate(product?.id); }} className='btn '>+ add to cart</button>
              </div>
            </div>
          </div>
    </>
  )
}
