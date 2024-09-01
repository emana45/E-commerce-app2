import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { auth } from '../Context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { payOnline } from '../../Apis/paymentApi';
import { Helmet } from 'react-helmet';
export default function Register() {

  let{cartId} = useParams();
  let[loading,setLoading]=useState(false);
  let [msg,setMsg]=useState('')
  let Navigate = useNavigate()

  let{data,mutate,error}=useMutation({mutationFn:payOnline ,
    onSuccess:(data)=>{
      window.location.href = data?.data?.session?.url
    },
    onError:(error)=>{console.log(error);
    }
  })

  function handelRegister(shippingAddress) {
  
  mutate({cartId,shippingAddress})

    }
    

  let validationSchema = yup.object({
    details:yup.string().required('details is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be valid').required('phone is required'),
    city:yup.string().required('city is required')
  })



  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: handelRegister
  })

  return (
    <>

      <div className='w-3/4 mx-auto'>

        {msg?<div class="w-full mx-auto p-4 m-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{msg}</span>
          </div> : ''}

        <form className="mx-auto w-full" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="details" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Details:</label>
            <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="details" name='details' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.details && formik.touched.details ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.details}</span>
          </div> : ''}  
          
             <div className="mb-5">
            <label htmlFor="phone" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="phone" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.phone && formik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.phone}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="city" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">City:</label>
            <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.city && formik.touched.city ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.city}</span>
          </div> : ''}

     

          { formik.values.phone&&formik.values.details&&formik.values.city?<button type="submit" className="ms-auto text-white font-semibold  bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 ">{loading?<i className="fas fa-spin fa-spinner"></i>:'confirm'}</button>:<button type="submit" className="ms-auto text-gray-500 font-semibold  bg-white focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 border border-1 border-black">confirm</button>}
        </form>
        </div>
        <Helmet>
  <title>Payment Form</title>
  <meta name="description" content="Helmet application" />
</Helmet>

    </>
  )

 }