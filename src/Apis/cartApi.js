import axios from "axios";
import { useState } from "react";



let baseUrl = 'https://ecommerce.routemisr.com/api/v1';
let token = localStorage.getItem('userToken')


// add to cart
export function addToCart(productId) {
   return axios.post(`${baseUrl}/cart`, { productId }, {
     headers: {
       token
     }
   })
 }


// get from cart
export function getFromCart(){
 return axios.get(`${baseUrl}/cart` , {
    headers:{
        token
    }
 })
}

// delete from cart
export function deleteFromCart(id){
 return axios.delete(`${baseUrl}/cart/${id}` , {
  headers:{
    token
  }
 })
}

// update cart quantity

export function updateCart({id,count}){
  return axios.put(`${baseUrl}/cart/${id}`, {count} , {
   headers:{
     token
   }
  })
 }

 //clear cart
 export function clearCart(){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
   headers:{
     token
   }
  })
 }

