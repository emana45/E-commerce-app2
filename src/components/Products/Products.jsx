import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useMutation } from '@tanstack/react-query'
import { addToCart } from '../../Apis/cartApi'
import { toast } from 'react-toastify'
import { addToWishList } from '../../Apis/wishListApi'
import Item from '../Item/Item'
import { Helmet } from 'react-helmet'



export default function Products() {

  
  let [isloading, setLoading] = useState(false)
  let [products, setProducts] = useState([])



  function getProducts() {
    setLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setLoading(false)
        setProducts(data.data);
        console.log(products);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (isloading) {
    return <Loading />
  }



  return (
    <>
      <div className="row">
        {products.map((product) => {
          return <Item key={product._id} product={product}/>

        })}
      </div>
      <Helmet>
  <title>Products component</title>
  <meta name="description" content="Helmet application" />
</Helmet>

    </>
  )
}
