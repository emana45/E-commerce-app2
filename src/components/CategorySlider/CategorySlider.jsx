import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Slider from "react-slick";

export default function Categories() {
 
  let [categories, setcategories] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:8,
    slidesToScroll: 3,
    autoplay:true
  };


  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setcategories(data.data)
      })
      .catch((error) => {
        console.log(error);

      })
  }

  useEffect(()=>{
    getCategories()     
  },[])

  return (
    <>
    <Slider {...settings} className='my-4'>
      {categories.map((category)=>{
        return<> <img key={category._id} src={category.image} alt="" className='h-[200px] object-cover' />
        <h3>{category?.name}</h3></>
      })}
    </Slider>
    </>
  )
}

