import js from '@eslint/js'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function WishList() {
  const [Cart, setCart] = useState([])

  useEffect(() => {
    if(localStorage.getItem("Cart")===null){
      localStorage.setItem("Cart",JSON.stringify([]))
    }else{
    let data = localStorage.getItem("Cart"||[])
    let parse = JSON.parse(data)
    setCart(parse)

    }


    
    
  
    return () => {
      
    }
  }, [])



  
    












  return <>

  <div className={`flex justify-center items-center ps-10 ${Cart.length === 0 ? "h-screen":" mb-52"}`}>


<div className='flex flex-wrap container gap-5 mt-11 md:flex-row md:gap-2 items-center  justify-start w-full   '>


{Cart.map((C,index)=>{return<>




<div className="  bg-gray-200 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 md:w-[49%] lg:w-[32%]  w-full mt-2  ">
  <div className='flex justify-center items-center p-4'>
    <img className=" h-60 object-cover" src={C.img} alt />
  </div>

  <div className='bg-red-950 py-1'></div>

 


</div>








</>

})}

</div>
</div>

  
  
  
  </>
}
