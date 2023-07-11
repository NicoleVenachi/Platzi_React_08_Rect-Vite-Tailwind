import { createContext, useState } from 'react'

export const ShoppingCardContext = createContext()

export const ShoppingCardProvider = ({ children }) => {
  //Shoping Cart - Increment quantity
  const [count, setCount] = useState(0) //counter para el carrito

  //Shoping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]) //counter para el carrito

  //Product Detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false) //flag para el productDetail

  const openProductDetail = () => setIsProductDetailOpen(true) // en contex creo funcion par la logica de apertura
  const closeProductDetail = () => setIsProductDetailOpen(false)

  //Product Detail - Show product
  const [productToShow, setProductToShow] = useState({}) //flag para el productDetail

  //Product Detail - open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false) //flag para el CheckoutSideMenu

  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true) // en contex creo funcion par la logica de apertura
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)


  return (
    <ShoppingCardContext.Provider value={{
      count,
      setCount,

      cartProducts,
      setCartProducts,

      isProductDetailOpen,
      openProductDetail,
      closeProductDetail,

      productToShow,
      setProductToShow,

      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu
    }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}

