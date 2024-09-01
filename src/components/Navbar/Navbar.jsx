import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getFromCart } from '../../Apis/cartApi'

export default function Navbar() {

    let { isLogin, setLogin } = useContext(auth)
    let Navigate = useNavigate()

    let { data , isLoading} = useQuery({
        queryKey: ['getCartItems'],
        queryFn: getFromCart,
        select: (data) => data?.data,
       
      })

    function logOut(){
        localStorage.removeItem('userToken');
        setLogin(null);
        Navigate('/login')
    }

    return (
        <>
            <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/home' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <i className="fa-solid fa-cart-shopping text-green-600 text-3xl" ></i>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Cart</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isLogin ?
                          <>  <NavLink to='/cart'><div className='relative cursor-pointer mr-8'>
                          <i className="fa-solid fa-cart-shopping text-gray-600 hover:text-gray-900 transition-all duration-100 text-3xl" ></i>
                          <div className='absolute w-[20px] h-[20px] rounded-md text-sm bg-green-600 flex justify-center items-center top-[-12px] right-[-8px]'>
                              <span className='text-white'>{data?.numOfCartItems?data?.numOfCartItems:0}</span>
                          </div>
                          </div> </NavLink>
                                <NavLink className='list-none  text-gray-500 hover:text-green-700 cursor-pointer font-medium' onClick={logOut}>LogOut</NavLink>
                            </>
                        : <div className='flex justify-between items-center'>
                            <NavLink to='register' className='list-none ml-8 text-gray-500 hover:text-green-700 cursor-pointer font-medium'>Register</NavLink>
                            <NavLink to='/' className='list-none ml-8 text-gray-500 hover:text-green-700 cursor-pointer font-medium'>Login</NavLink>
                        </div>}
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        {isLogin ? <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to='/home' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='cart' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
                            </li>
                            <li>
                                <NavLink to='wishList' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">WishList</NavLink>
                            </li>
                            <li>
                                <NavLink to='products' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
                            </li>
                            <li>
                                <NavLink to='categories' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to='brands' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
                            </li>
                        </ul> : ''}
                    </div>
                </div>
            </nav>


        </>



    )
}
