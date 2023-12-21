import React, { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SliderModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  hasOutsideClick?: boolean
}

const SliderModal = ({
  isOpen,
  onClose,
  hasOutsideClick = false,
  children,
}: SliderModalProps) => {
  const handleOnClose = () => {
    if (!hasOutsideClick) return
    onClose()
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed right-0 top-0 z-50 flex h-full w-screen bg-black bg-opacity-50"
          onClick={handleOnClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SliderModal
