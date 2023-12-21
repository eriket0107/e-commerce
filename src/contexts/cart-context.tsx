'use client'

import { Cart } from '@/app/components/cart-modal'
import { ReactNode, createContext, useContext, useState } from 'react'

type CartItem = {
  productId: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (productId: number) => void
  isOpen: boolean
  onOpenCart: (state: boolean) => void
}

const CartContext = createContext({} as CartContextType)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const addToCart = (productId: number) => {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId)

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 }
          } else return item
        })
      } else {
        return [...state, { productId, quantity: 1 }]
      }
    })
  }

  const onOpenCart = (state: boolean) => {
    if (!cartItems.length) return

    setIsOpen(state)
  }

  return (
    <CartContext.Provider
      value={{ items: cartItems, addToCart, isOpen, onOpenCart }}
    >
      <Cart />
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  return context
}
