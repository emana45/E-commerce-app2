import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { auth } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
export default function Register() {

  let[loading,setLoading]=useState(false);
  let [msg,setMsg]=useState('')
  let Navigate = useNavigate()

  function handelRegister(values) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then(({data})=>{
      if(data?.message==='success'){
        setLoading(false)
        setMsg('')
        localStorage.setItem('userToken',data?.token)
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
    name: yup.string().min(2, 'min length is 2').max(10, 'max length is 10').required('name is required'),
    email: yup.string().email().required('email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with Char').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'email must be matched password').required('rePassword is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be valid').required('phone is required')
  })



  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handelRegister
  })

  return (
    <>

      <div className='w-3/4 mx-auto'>
        <h2 className='font-medium text-3xl mb-8'>Register Now:</h2>

        {msg?<div class="w-full mx-auto p-4 m-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{msg}</span>
          </div> : ''}

        <form className="mx-auto w-full" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Name:</label>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.name && formik.touched.name ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.name}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="email" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.email && formik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.email}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="password" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Password:</label>
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.password}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="rePassword" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">rePassword:</label>
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="rePassword" name='rePassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

          {formik.errors.rePassword && formik.touched.rePassword ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.rePassword}</span>
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="phone" className="block  mb-2 text-[15px] text-sm text-gray-900 dark:text-white">Phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="" />
          </div>

           {formik.errors.phone && formik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.phone}</span>
          </div> : ''}

          { formik.values.phone&&formik.values.email&&formik.values.name&&formik.values.password&&formik.values.rePassword&&formik.values.phone?<button type="submit" className="ms-auto text-white font-semibold  bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 ">{loading?<i className="fas fa-spin fa-spinner"></i>:'Register Now'}</button>:<button type="submit" className="ms-auto text-gray-500 font-semibold  bg-white focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:focus:ring-green-800 border border-1 border-black">Register Now</button>}
        </form>
        </div>
        <Helmet>
  <title>Register component</title>
  <meta name="description" content="Helmet application" />
</Helmet>

    </>
  )

 }