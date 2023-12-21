import { ReactNode } from 'react'
import { CartProvider } from './cart-context'

export const Provider = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>
}
