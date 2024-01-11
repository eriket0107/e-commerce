import { api } from '@/data/api'
import { ProductType } from '@/data/types/product'
import { priceCurrencyReal } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

const getFeaturedProducts = async (): Promise<ProductType[]> => {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

const Home = async () => {
  const [highLigthedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLigthedProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          src={highLigthedProduct.image}
          width={780}
          height={780}
          quality={100}
          alt=""
          className="transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="truncate">{highLigthedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {priceCurrencyReal(highLigthedProduct.price)}
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
            width={496}
            height={418}
            quality={100}
            alt=""
            className="transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-10 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {priceCurrencyReal(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
