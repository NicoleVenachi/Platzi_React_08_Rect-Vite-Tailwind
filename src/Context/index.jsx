import { createContext, useEffect, useState } from 'react'

export const ShoppingCardContext = createContext() //este nombre deberia ser Cart

export const ShoppingCardProvider = ({ children }) => {
  //Shoping Cart - Increment quantity
  const [count, setCount] = useState(0) //counter para el carrito

  //Shoping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]) //productos del crrito

  //Shoping Cart - Order
  const [order, setOrder] = useState([]) // orden del crrito

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

  // Get products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)
  //console.log('searchByTitle: ', searchByTitle)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  // logica

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])



  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])



  return (
    <ShoppingCardContext.Provider value={{
      count,
      setCount,

      cartProducts,
      setCartProducts,

      order,
      setOrder,

      isProductDetailOpen,
      openProductDetail,
      closeProductDetail,

      productToShow,
      setProductToShow,

      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,

      items,
      setItems,

      searchByTitle,
      setSearchByTitle,

      filteredItems,
      searchByCategory,
      setSearchByCategory
    }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}

