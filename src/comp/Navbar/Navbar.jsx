import React, { useEffect, useState,useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {CartContext} from "../../context/CartContext.jsx"



export default function Navbar(props) {
    let{setGlobal,Global,setglobalWish,globalWish}=useContext(CartContext)
    const [WishCount, setWishCount] = useState([])
    const [CartCount, setCartCount] = useState([])
    const {SunMoon,setSunMoon} = props.sun
    const [Toggle, setToggle] = useState(false)

    useEffect(() => {
      let wishCount = JSON.parse(localStorage.getItem("Wish"))
      let cartCount = JSON.parse(localStorage.getItem("Cart"))
      setCartCount(cartCount?.length)
      setWishCount(wishCount?.length)
      
    
      return () => {
        
      }
    }, [Global,globalWish])
    

  

  
  

 

  useEffect(() => {
    let cart = localStorage.getItem("Cart"||"[]")
    let parse = JSON.parse(cart)
    console.log(parse,"navvvvv")

  
    return () => {

    }
  }, [])
  


  return <>




<nav className="border-gray-200 bg-gray-300 dark:bg-gray-800 dark:border-gray-700 w-full sticky top-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
<i class="fa-solid fa-cart-shopping text-5xl text-green-600"></i>    </div>
    <button onClick={()=>setToggle(!Toggle)}  data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div onClick={()=>setSunMoon(!SunMoon)} className=' cursor-pointer  active:animate-spin p-5  text-center '>
    {SunMoon==true?<i className="fa-solid fa-sun text-2xl  text-yellow-500 transition-transform duration-700"></i>:<i className="fa-solid fa-moon text-2xl text-gray-50 transition-transform duration-700"></i>}
    </div>
    <div className={` ${Toggle === false ? " hidden": " "}   w-full md:block md:w-auto`} id="navbar-solid-bg">
      
      <ul className=" font-serif font-bold justify-center items-center  flex flex-col  mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
    <NavLink onClick={()=>setToggle(false)} to="products" className={`hover:text-green-700 md:aria-[current=page]:text-green-700`}>
        <span>Products</span>
    </NavLink>
    <NavLink onClick={()=>setToggle(false)} to="wishlist" className={`hover:text-green-700 md:aria-[current=page]:text-green-700`}>
      <div className='flex justify-center items-center gap-1'>
        <span>Wish List</span>
        <div className=' relative'>
       
        {WishCount === 0 || localStorage.getItem("Wish")===null ? null : <i class="fa-solid fa-heart text-3xl text-green-700"></i> }
        <span className='text-white absolute left-[35%] bottom-[25%]'>{WishCount ===0 ? null : WishCount}</span>
        </div>
      </div>
    </NavLink>
    <NavLink onClick={()=>setToggle(false)} to="cart" className={`hover:text-green-700 md:aria-[current=page]:text-green-700`}>
      <div className='flex gap-1 justify-center items-center'>
        <span>Cart</span>
        <div className=' relative flex justify-center items-center'>
       
        {CartCount === 0 ||localStorage.getItem("Cart")===null ? null : <i class="fa-solid fa-cart-shopping text-3xl text-green-700"></i> }
        <span className='text-white absolute left-[46%] bottom-[29%]'>{CartCount ===0 ? null : CartCount}</span>
        </div>
      </div>
    </NavLink>
      </ul>
    </div>
  </div>
</nav>


  
  
  </>
}
