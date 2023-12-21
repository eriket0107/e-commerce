import { api } from '@/data/api'
import Image from 'next/image'
import { ProductType } from '@/data/types/product'
import { PriceCurrencyReal } from '@/utils'
import { Metadata } from 'next'
import AddToCartButton from '@/app/components/add-to-cart-button'

type ProductProps = {
  params: { slug: string }
}

const getProduct = async (slug: string): Promise<ProductType> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

export const generateMetadata = async ({
  params,
}: ProductProps): Promise<Metadata> => {
  const response = await api(`/products/${params.slug}`)

  const { title } = await response.json()

  return {
    title,
  }
}

export const generateStaticParams = async () => {
  const response = await api('/products/featured')
  const products: ProductType[] = await response.json()

  return [...products]
}

const Product = async ({ params }: ProductProps) => {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="text-zinc-450 mt-2 leading-relaxed">DESCRIÇÃO</p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {PriceCurrencyReal(product.price)}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/juros de {PriceCurrencyReal(product.price / 12)}
          </span>
        </div>

        <div className="mt-8 space-y-4 ">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
          <AddToCartButton productId={product.id}>
            Adicionar ao carrinho
          </AddToCartButton>
        </div>
      </div>
    </div>
  )
}

export default Product
