import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import WishList from './components/WishList/WishList'
import Cart from './components/Cart/Cart'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetCode from './components/ResetCode/ResetCode'
import ResetNewPassword from './components/ResetNewPassword/ResetNewPassword'
import ProductDetails from './components/ProductDetails/ProductDetails'
import NotFound from './components/NotFound/NotFound'
import RelatedSubcategories from './components/RelatedSubcategories/RelatedSubcategories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import PayForm from './components/PayForm/PayForm'


function App() {

  const queryClient = new QueryClient()

let route = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'relatedSubCategories/:id/:categoryName' , element:<ProtectedRoute><RelatedSubcategories/></ProtectedRoute>},
    {index:true  , element:<Login/>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'register' , element:<Register/>},
    {path:'productDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'forgetPassword' , element:<ForgetPassword/>},
    {path:'resetCode' , element:<ResetCode/>},
    {path:'payForm/:cartId' , element:<PayForm/>},
    {path:'resetNewPassword' , element:<ResetNewPassword/>},
    {path:'wishList' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'*' , element:<NotFound/>},
  ]}
])

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer
      theme="colored"
      />
      </QueryClientProvider>
    </>
  )
}

export default App
