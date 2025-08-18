import React from 'react'
import ProductList from './components/ProductList'

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>
}) => {
  const { category } = await searchParams
  return (

    <ProductList category={category} params="products" />
  )
}

export default ProductPage
