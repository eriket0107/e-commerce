import { ReactNode } from 'react'
import Header from '../components/header'
import { Provider } from '@/contexts/providers'

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <div className="relative mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 p-8 pt-0">
        <Header />
        {children}
      </div>
    </Provider>
  )
}

export default StoreLayout
