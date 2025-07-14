import React, { createContext, useState } from 'react'

export  const CartContext = createContext()

export default function CartProvider({children}) {
    const [Global, setGlobal] = useState(null)
    const [globalWish, setglobalWish] = useState(null)





  return<>

  <CartContext.Provider value={{setGlobal,Global,setglobalWish,globalWish}}>
    {children}
  </CartContext.Provider>
  
  </>
}

export function useCart() {
  return useContext(CartContext);
}

