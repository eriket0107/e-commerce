import { api } from '@/data/api'
import { ProductType } from '@/data/types/product'
import { priceCurrencyReal } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type SearchProps = {
  searchParams: {
    q: string
  }
}

const searchProducts = async (query: string): Promise<ProductType[]> => {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

const Search = async ({ searchParams }: SearchProps) => {
  const { q: query } = searchParams

  const products = await searchProducts(query)

  if (!query) {
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative flex items-start justify-center overflow-hidden rounded-lg bg-zinc-900"
          >
            <Image
              src={product.image}
              width={480}
              height={480}
              quality={100}
              alt=""
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {priceCurrencyReal(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Search
