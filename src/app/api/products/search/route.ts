import { set, z } from 'zod'
import data from '../data.json'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const { searchParams } = request.nextUrl
  const query = z.string().parse(searchParams.get('q'))

  const product = data.products.filter((products) => {
    return products.title.toLowerCase().includes(query.toLowerCase())
  })

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
