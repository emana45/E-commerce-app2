
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { auth } from '../Context/AuthContext';

export default function ResetNewPassword() {

  let[loading,setLoading]=useState(false);
  let [msg,setMsg]=useState('')
  let Navigate = useNavigate()

  function handleNewPassword(values) {
    setLoading(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then(({data})=>{
        console.log(data);
        
      if(data?.message==='success'){
        setLoading(false)
        setMsg('')
        Navigate('/')
      }
    }
    )
    .catch((error)=>{
      setLoading(false)
      setMsg(error?.response?.data?.message)
  })
    }

 

  let validationSchema = yup.object({
    email: yup.string().email().required('email is required'),
    newPassword: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with Char').required('password is required'),
  })



  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleNewPassword
  })
  return (
    <>
         <div className='w-3/4 mx-auto'>
        <h2 className='font-medium text-3xl mb-8'>Set New Password:</h2>

        {msg?<div class="w-full mx-auto p-4 m-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{msg}</span>
          </div> : ''}

        <form className="mx-auto w-full" onSubmit={formik.handleSubmit}>
     

          <div className="mb-5">
            <label htmlFor="email" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.email && formik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.email}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="newPassword" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">New Password:</label>
            <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="newPassword" name='newPassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.newPassword && formik.touched.newPassword ? <div clasNames="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.newPassword}</span>
          </div> : ''}


          { formik.values.email&&formik.values.newPassword?<button type="submit" className="ms-auto text-white font-semibold  bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 ">{loading?<i className="fas fa-spin fa-spinner"></i>:'confirm'}</button>:<button type="submit" className="ms-auto text-gray-500 font-semibold  bg-white focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 border border-1 border-black">confirm</button>}
        </form>

        </div></>
  )
}
