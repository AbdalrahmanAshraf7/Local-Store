import js from '@eslint/js'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {CartContext} from "../../context/CartContext.jsx"
import { useOutletContext } from 'react-router-dom';
import * as Yup from "yup"


export default function Products() {

  const [Products, setProducts] = useState([])
  const [HiddenButton, setHiddenButton] = useState(false)
  const [pIndex, setpIndex] = useState(0)
  const [isUpdate, setisUpdate] = useState(false)
  const [Wish, setWish] = useState([])
  const [Cart, setCart] = useState([])
  const [Results, setResults] = useState(null)
  let{setGlobal,Global,setglobalWish,globalWish}=useContext(CartContext)

  console.log(Products)



useEffect(() => {
  const data = localStorage.getItem('Data');
  if (data) {
    setProducts(JSON.parse(data));
  }
}, []); 


  

  useEffect(() => {
    setGlobal(Cart.length)
    setglobalWish(Wish.length)
    return () => {
    }
  }, [Cart,Wish])
  



  const loadWish = ()=>{
    const data = localStorage.getItem("Wish")
    return data ? JSON.parse(data) : []
  }
  const loadCart = ()=>{
    const data = localStorage.getItem("Cart")
    return data ? JSON.parse(data) : []
  }

  
  const loadProducts = ()=>{
    const data = localStorage.getItem("Data")
    return data ? JSON.parse(data) : []
  }

  useEffect(() => {
    setProducts(loadProducts())
    
  
    return () => {
      
    }
  }, [])
  useEffect(() => {
    setWish(loadWish())
    
  
    return () => {
      
    }
  }, [])
  useEffect(() => {
    setCart(loadCart())
    
  
    return () => {
      
    }
  }, [])
  


  useEffect(() => {
    let data =localStorage.getItem("Data")
    if(data===null){
      localStorage.setItem("Data",JSON.stringify([]))
    }
    return () => {
      
    }
  }, [])
  



  async function addProducts(values) {
      let data = localStorage.getItem("Data")

    try{
      if(localStorage.getItem("Data")===null){

        localStorage.setItem('Data',JSON.stringify([]))


      }if(localStorage.getItem("Data")){
  let data = localStorage.getItem("Data")
  let parse = JSON.parse(data)
  let array = [...parse , {id: uuidv4() ,...values }] 
  localStorage.setItem("Data",JSON.stringify(array))
     setProducts(array);
       formik.resetForm();

      }else{
        console.log("here here")
      }

 

     


    }catch(err){

      console.log(err)
    }


    
  }







  let validationSchema = Yup.object().shape({
    name:Yup.string().required().min(3,"enter 3 letters or more ").max(10,"You can't enter more then 10 letters "),
    price: Yup.string().required().matches(/^[1-9][0-9]*$/, "it must be a number and not less than 1"),
    description:Yup.string().required().min(5,"enter more than 5 letters").max(100,"no more than 100 letters"),
  })



  let formik = useFormik({

    initialValues:{
      name:"",
      price:"",
      description:"",
      img:""

    },validationSchema,onSubmit : (values)=>{
      if (isUpdate){
        updateIt(pIndex,values)


      }else{

        addProducts(values)

      }
    }
  })





  function deleteProduct (id){

   let deletedProduct= Products.filter((P)=> id != P.id  )
    setProducts(deletedProduct)
    localStorage.setItem("Data",JSON.stringify(deletedProduct))
    let deleteWish = Wish.filter((W)=> id !== W.id)
    setWish(deleteWish)
    localStorage.setItem("Wish",JSON.stringify(deleteWish))
    let deleteCart = Wish.filter((W)=> id !== W.id)
    setCart(deleteCart)
    localStorage.setItem("Cart",JSON.stringify(deleteCart))
  }




  function updateProduct(id,index){

    let updatedProducts= Products[index]
    let updated =  formik.setValues({

      name:updatedProducts.name,
      price:updatedProducts.price,
      description:updatedProducts.description,
      img:updatedProducts.img
      
   })

   setpIndex(index)
   setisUpdate(true)

  }

  function updateIt(index ,values){
    let updated = Products
updated.splice(index, 1, { ...updated[index], ...values })   
 setProducts(updated)
    localStorage.setItem("Data",JSON.stringify(updated))

      setisUpdate(false)
      formik.resetForm()
  }


  function wish (id){
    if(localStorage.getItem("Wish")===null){
      localStorage.setItem("Wish",JSON.stringify([]))
    }

    if(Wish.find((W)=>W.id===id)){
      let removeWish= Wish.filter((P)=> P.id!==id)
      localStorage.setItem("Wish",JSON.stringify(removeWish))
      let data = localStorage.getItem('Wish')
      let parse = JSON.parse(data)
      setWish(parse)
      console.log(removeWish,"reeeeeeeeeeee")

      


      
    }else{

    let wish = Products.filter((P)=> P.id == id) 
    let wishItem= wish[0]
    let data = localStorage.getItem("Wish")
    let parse = JSON.parse(data)
    let array = [...parse,wishItem]
    localStorage.setItem("Wish",JSON.stringify(array))
    let Wishs = JSON.parse(localStorage.getItem("Wish"))
    setWish(Wishs)


    }

    




  }


  useEffect(() => {
        console.log(Wish,"asdasdsaddasd")

    
  
    return () => {
      
    }
  }, [Wish])


  function cart (id){

    if(localStorage.getItem("Cart")===null){
      localStorage.setItem("Cart",JSON.stringify([]))
    }if(Cart.find((C)=>C.id === id)){
      let data = Cart.filter((C)=>C.id !==id)
      let store = localStorage.setItem("Cart",JSON.stringify(data))
      let parse = JSON.parse(localStorage.getItem("Cart"))
      setCart(parse)

    }else{
     let cartItem =  Products.filter((P)=>P.id === id)
     let specificItem=cartItem[0]
     let cartStorage= localStorage.getItem("Cart")
     let parse = JSON.parse(cartStorage)
     let array = [...parse,specificItem]
     localStorage.setItem("Cart",JSON.stringify(array))
     let cart = JSON.parse(localStorage.getItem("Cart"))
     setCart(cart)
     
    
    }





  }

  useEffect(() => {
    
    console.log(Cart)
    
  
    return () => {
      
    }
  }, [Cart])



  
  
  








  

  







  return <>


<form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto font-bold">
  <div className="mb-5">
    <label htmlFor="name" className="font-bold block mb-2 text-sm  text-gray-900 dark:text-white">Product Name</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  required />
  </div>
        {formik.errors.name&&formik.touched.name &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.name}
</div>}
  <div className="mb-5">
    <label htmlFor="price" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Product Price</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} type="tel" id="price" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
    {formik.errors.price&&formik.touched.price &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.price}
</div>}
  <div className="mb-5">
    <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Description</label>
    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} type="text" id="description" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
    {formik.errors.description&&formik.touched.description &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.description}
</div>}
  <div className="mb-5">

    <label htmlFor="img"> </label>
    <input onChange={(e)=>{ const img = e.currentTarget.files[0];
      let read = new FileReader

      read.onloadend =()=>{
        const base64 = read.result
        formik.setFieldValue("img",base64)
      }
      if(img){
        read.readAsDataURL(img)
      }

  
    }} type="file" id="img" className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light text-red-800" required />
  </div>

  

{
  HiddenButton==false ?<button type="submit" className={`font-bold font-serif text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Add Product</button>:  <button type="submit" className={`${HiddenButton} font-serif font-bold text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} onClick={()=>setHiddenButton(false)}>Up date</button>

}
  
</form>


<div className='flex justify-center items-center  ps-10'>


<div className='flex flex-wrap container gap-5 mt-11 md:flex-row md:gap-2 items-center  justify-start w-full   '>


{Products.map((p,index)=>{return<>




<div className="  bg-gray-200 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 md:w-[49%] lg:w-[32%]  w-full mt-2  ">
  <div className='flex justify-center items-center p-4'>
    <img className=" h-60 object-cover" src={p.img} alt />
  </div>

  <div className='bg-red-950 py-[3px]'></div>

  <div className='flex flex-col p-3 font-serif font-bold'>
    <span><span className='text-red-900'>Name:</span> {p.name}</span>
    <span><span className='text-red-900'>Price:</span> {p.price} $</span>
    <span><span className='text-red-900'>Description:</span> {p.description}</span>

  </div>

 

    <div className='mt-9 text-2xl  flex justify-between p-2' >
  <i class="fa-solid fa-trash-can text-red-950 cursor-pointer" onClick={()=>deleteProduct(p.id)}></i>
    <i class={`fa-solid fa-heart text-3xl cursor-pointer ${Wish.find((W)=> W.id ==p.id) ?"text-red-700":"text-black" }`} onClick={()=>wish(p.id)}></i>
      <i class={`fa-solid fa-cart-arrow-down cursor-pointer text-3xl ${Cart.find((C)=>C.id===p.id)?"text-green-600":"text-black"}`} onClick={()=>cart(p.id)}></i>
  <div className='flex bg-yellow-500 justify-center items-center gap-3 rounded p-1 font-bold font-serif text-sm' onClick={()=>{updateProduct(p.id,index); setHiddenButton(true) }}>
      <i class="fa-solid fa-rotate text-white cursor-pointer "></i>
      <span className='text-white cursor-pointer'>Update</span>
  </div>

</div>
</div>








</>

})}

</div>
</div>


  
  
  </>
}
