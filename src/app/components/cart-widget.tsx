'use client'
import { useCart } from '@/contexts/cart-context'
import { ShoppingBag } from 'lucide-react'

const CartWidget = () => {
  const { items, onOpenCart, isOpen } = useCart()

  return (
    <>
      <button
        className="flex items-center gap-2"
        onClick={() => onOpenCart(!isOpen)}
      >
        <ShoppingBag className="h-4 w-4" />
        <span className="text-sm">Cart ({items.length})</span>
      </button>
    </>
  )
}

export default CartWidget
