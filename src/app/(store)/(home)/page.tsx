import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { PriceCurrencyReal } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await api('/products/featured')

  const products = await response.json()

  return products
}

const Home = async () => {
  const [highLigthedProduct, ...otherProducts] = await getFeaturedProducts()

  console.log(highLigthedProduct)
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLigthedProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex items-start justify-center overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          src={highLigthedProduct.image}
          width={920}
          height={920}
          quality={100}
          alt=""
          className="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="truncate">{highLigthedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {PriceCurrencyReal(highLigthedProduct.price)}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.slug}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 flex items-start justify-center overflow-hidden rounded-lg bg-zinc-900"
        >
          <Image
            src={product.image}
            width={920}
            height={920}
            quality={100}
            alt=""
            className="transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-10 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {PriceCurrencyReal(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
