import { useCart } from '@/contexts/cart-context'
import SliderModal from './slider-modal'
import { motion } from 'framer-motion'

export const Cart = () => {
  const { onOpenCart, isOpen } = useCart()

  return (
    <SliderModal
      isOpen={isOpen}
      onClose={() => onOpenCart(!isOpen)}
      hasOutsideClick
    >
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        className="absolute right-0 h-full w-1/3 bg-red-800"
      >
        oi
      </motion.div>
    </SliderModal>
  )
}
