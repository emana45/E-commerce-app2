import axios from "axios";


let baseUrl = 'https://ecommerce.routemisr.com/api/v1';
let token = localStorage.getItem('userToken')


// add to wishList
export function addToWishList(productId) {
   return axios.post(`${baseUrl}/wishlist`, { productId }, {
     headers: {
       token
     }
   })
 }

 // get from WishList
export function getFromWishList(){
    return axios.get(`${baseUrl}/wishlist` , {
       headers:{
           token
       }
    })
   }