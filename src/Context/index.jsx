import { createContext, useState } from 'react'

export const ShoppingCardContext = createContext()

export const ShoppingCardProvider = ({ children }) => {
  //Shoping Cart - Increment quantity
  const [count, setCount] = useState(0) //counter para el carrito

  //Product Detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false) //flag para el productDetail

  const openProductDetail = () => setIsProductDetailOpen(true) // en contex creo funcion par la logica de apertura
  const closeProductDetail = () => setIsProductDetailOpen(false)

  //Product Detail - Show product
  const [productToShow, setProductToShow] = useState({}) //flag para el productDetail
  return (
    <ShoppingCardContext.Provider value={{
      count,
      setCount,

      isProductDetailOpen,
      openProductDetail,
      closeProductDetail,

      productToShow,
      setProductToShow
    }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}

