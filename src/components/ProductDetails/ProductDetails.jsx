import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from 'react-slick/lib/slider';
import Loading from '../Loading/Loading';
import { useMutation } from '@tanstack/react-query';
import { addToWishList } from '../../Apis/wishListApi';
import { toast } from 'react-toastify';
import { addToCart } from '../../Apis/cartApi';

export default function ProductDetails() {

  let[wishItem , setWishItem] = useState(false)
  let[isloading , setLoading] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  let [product, setProduct] = useState(null)
  let { id } = useParams();

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

  function getProduct(id) {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data?.data);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      })
  }

  function makeWish(){
    setWishItem(!wishItem)
  }

  useEffect(() => {
    getProduct(id)
    
  }, [id])

  if(isloading){
    return <Loading/>
   }


  return (
    <>

      <div className="row px-20">
        <div className="md:w-1/3">
          <Slider {...settings}>
            {product?.images?.map((srcImg) => {
             return <img key={id} src={srcImg} className='w-full'></img>
            })}
          </Slider>
        </div>
        <div className="md:w-2/3 px-8 ">
          <h3 className='text-2xl font-semibold'>{product?.title}</h3>
          <p className='py-4 text-gray-800'>{product?.description}</p>
          <div className=''>
          <div className='flex justify-between items-center pt-2'>
          <span className='text-light'>{`${product?.price} EGP`}</span>
          <span className='text-gray-600'><i className="fas fa-star text-yellow-300"></i>{product?.ratingsAverage}</span>
          </div>
            <div className='px-2' dir='rtl'>
            <span onClick={()=>{addMutate(product?.id); makeWish()}} ><i className={`fa-solid fa-heart text-2xl pt-2 ms-auto cursor-pointer ${wishItem?'text-red-600':'text-black'}`}></i></span>
              </div>
          </div>
          <div className='flex justify-center'><button onClick={() => { mutate(product?.id); }} className='btn '>add to cart</button></div>
        </div>
      </div>
      <div>
      </div >
    </>
  )
}
