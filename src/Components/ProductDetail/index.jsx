import { useContext, useState } from 'react'

import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { ShoppingCardContext } from '../../Context'
//import './styles.css'
const ProductDetail = () => {

  const context = useContext(ShoppingCardContext)
  console.log('PRODUCT TO SHOW:', context.productToShow);

  // Product - Img to show (entre todas las que hay)
  const [image, setImage] = useState(0)

  const nextImage = () => {

    //siempre se devuelve a 0, vuelve a dar la vuelta
    if (image === context.productToShow.images.length - 1) {
      setImage(0)
    } else {
      setImage(image + 1)
    }
  }

  return (
    <aside
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-68px)] flex flex-col fixed right-0 top-[68px] border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div onClick={() => context.closeProductDetail()}>
          <XMarkIcon className="h-6 w-6 text-black-500 cursor-pointer" />
        </div>
      </div>

      <figure className='px-6 relative'>
        <img
          className='w-full h-full rounded-lg'
          src={context.productToShow.images ? context.productToShow.images[image] : ""}
          alt={context.productToShow.title} />
        <div className='absolute right-8 top-0 h-full flex items-center'>
          <ChevronRightIcon
            className={`${context.productToShow.images?.lenght === 1 ? 'hidden' : ''}w-8 h-8 fill-white border border-black rounded-full cursor-pointer center-element bg-black/40`}
            onClick={() => nextImage()}
          ></ChevronRightIcon>
        </div>

      </figure>
      <div className='flex flex-col p-6'>
        <div className='flex justify-between items-center '>
          <span className='font-medium text-lg'>{context.productToShow.title}</span>
          <span className='font-medium text-2xl'>${context.productToShow.price}</span>
        </div>
        <span className='text-md'>{context.productToShow.description}</span>
      </div>
    </aside>
  )
}

export default ProductDetail
