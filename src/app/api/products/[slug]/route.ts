import { z } from 'zod'
import data from '../data.json'
import { NextResponse } from 'next/server'

export const GET = async (
  _: Request,
  { params }: { params: { slug: string } },
) => {
  const slug = z.string().parse(params.slug)

  const product = data.products.find((products) => products.slug === slug)

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
