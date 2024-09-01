import React from 'react'
import notFoundImg from '../../assets/error.svg'

export default function NotFound() {
  return (
   <>
   <div className='flex justify-center'>
    <img src={notFoundImg} alt="" />
   </div>
   
   </>
  )
}
