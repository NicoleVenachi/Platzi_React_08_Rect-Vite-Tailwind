import { useContext } from 'react'
import { ShoppingCardContext } from '../../Context'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid'

const Card = ({ data }) => {

  const context = useContext(ShoppingCardContext)

  const showProduct = (productDetail) => {
    context.openProductDetail() //open product detail
    context.setProductToShow(productDetail) //send product data 
  }

  const addProductToCart = (event, productData) => {
    event.stopPropagation() //hace que solo se ejecute este evento, y no otros padres
    context.setCount(context.count + 1) //aumento el contador
    context.setCartProducts([...context.cartProducts, productData]) //como si  hiera un push

    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter((cartProduct) => cartProduct.id === id).length > 0
    //si es >0,ya esta en carrito
    if (isInCart) {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
        >
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      )
    }
    else {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductToCart(event, data)}
        >
          <PlusIcon className="h-6 w-6 text-black-500" />
        </div>
      )
    }

  }
  return (
    <div
      className='bg-white cursor-pointer w-56 h-60'
      onClick={() => showProduct(data)}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.category.name}</span>
        <img src={data.images[0]}
          className='w-full h-full object-cover rounded-lg'
          alt={data.title} />
        {renderIcon(data.id)}
      </figure>
      <p className='flex justify-between'>
        <span className='text-sm font-light'> {data.title} </span>
        <span className='text-lg font-medium'> ${data.price} </span>
      </p>
    </div>
  )
}

export default Card
