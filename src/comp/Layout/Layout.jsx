import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
  const [WishCount, setWishCount] = useState(0)
  const [CartCount, setCartCount] = useState(0)
  const [SunMoon, setSunMoon] = useState(()=>{
     return localStorage.getItem("Mode")==="true" ? true :false
    })


  

   useEffect(() => {

    const mode = localStorage.setItem("Mode",SunMoon)
     return () => {
       
     }
   }, [SunMoon])
   

  


  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("Data"))
    let wishs = JSON.parse(localStorage.getItem("Wish"))
    let cart = JSON.parse(localStorage.getItem("Cart"))
    setWishCount(wishs?.length)
    setCartCount(cart?.length)

    
  
    return () => {
      
    }
  }, [])
  

 

  return<>

  <div className={`${SunMoon==true?"light":"dark"}  `}>
    <div className='bg-gray-100 dark:bg-black min-h-screen w-full'>


  <Navbar counts={{WishCount,CartCount}} sun={{SunMoon, setSunMoon}} ></Navbar>

  <div className='mt-16'>
  <Outlet   />
  </div>
  <Footer></Footer>
      </div>
  </div>
  </>
}
