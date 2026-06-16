export default function ProductJsonLd({ product, selectedSize }) {
  if (!product) return null

  const lowestPrice = product.sizes?.[0]?.price || 0
  const highestPrice = product.sizes?.[product.sizes.length - 1]?.price || lowestPrice
  const canonical = `https://niyuperfumes.vercel.app/#product-${product.id}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `NIYU ${product.name}`,
    image: product.images || [product.image],
    description: product.longDescription || product.description,
    brand: {
      '@type': 'Brand',
      name: 'NIYU Perfumes',
    },
    sku: product.id,
    offers: {
      '@type': 'AggregateOffer',
      url: canonical,
      priceCurrency: 'INR',
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'NIYU Perfumes',
      },
    },
    ...(product.notes && { category: 'Perfumes' }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
