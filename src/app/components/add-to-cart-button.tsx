'use client'
import { useCart } from '@/contexts/cart-context'
import { ComponentProps } from 'react'

type AddToCartButtonProps = {
  productId: number
} & ComponentProps<'button'>

const AddToCartButton = ({
  productId,
  children,
  ...props
}: AddToCartButtonProps) => {
  const { addToCart } = useCart()

  const handleAddProductToCart = () => {
    addToCart(productId)
  }
  return (
    <button
      type="button"
      className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={() => handleAddProductToCart()}
      {...props}
    >
      {children}
    </button>
  )
}

export default AddToCartButton
