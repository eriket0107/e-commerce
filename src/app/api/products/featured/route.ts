import data from '../data.json'

export const GET = async () => {
  const featuredProducts = data.products.filter((products) => products.featured)

  return Response.json(featuredProducts)
}
