import { createContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './comp/Layout/Layout.jsx'
import Home from './comp/Home/Home.jsx'
import LogIn from './comp/LogIn/LogIn.jsx'
import SignUp from './comp/SignUp/SignUp.jsx'
import Products from './comp/Products/Products.jsx'
import Cart from './comp/Cart/Cart.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
  import { ToastContainer, toast } from 'react-toastify';
import WishList from './comp/WishList/WishList.jsx'
import CartProvider from './context/CartContext.jsx'



function App() {
    const [refreshProducts, setRefreshProducts] = useState(false);

  let query = new QueryClient()

  let routes = createBrowserRouter([{

    path:"", element:<Layout/> ,children:[
      {path:"",element:<Products/>},
      {path:"home",element:<Home/>},
      {path:"products",element:<Products/>},
      {path:"wishlist",element:<WishList/>},
      {path:"cart",element:<Cart/>},
      {path:"login",element:<LogIn/>},
      {path:"signup",element:<SignUp/>},
    ]



  }])





  return (
    <>

    <QueryClientProvider client={query}>
      <CartProvider>
      <RouterProvider router={routes}>
    </RouterProvider>
      <ToastContainer />
   <ReactQueryDevtools/>
      </CartProvider>
    </QueryClientProvider>
    
     
    </>
  )
}

export default App
