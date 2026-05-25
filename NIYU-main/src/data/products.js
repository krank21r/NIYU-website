export const defaultSizes = [
  { label: '15ml', price: 499 },
  { label: '30ml', price: 899 },
  { label: '50ml', price: 1299 },
]

const products = [
  {
    id: 'rose-oudh',
    name: 'Rose Oudh',
    image: '/Rose oudh.jpeg',
    images: ['/Rose oudh.jpeg', '/Rose oudh.jpeg', '/Rose oudh.jpeg'],
    tag: 'Bestseller',
    description: 'A rich, romantic blend of rose and oudh that creates an unforgettable signature. Long-lasting and deeply luxurious.',
    longDescription: 'Rose Oudh captures the timeless elegance of Bulgarian roses intertwined with the smoky depth of genuine oudh. Each spray unfolds like a walk through a moonlit garden\u2014velvety petals giving way to warm, resinous undertones that linger for hours.',
    notes: ['Rose', 'Oudh', 'Amber'],
    topNotes: ['Bulgarian Rose', 'Pink Pepper'],
    heartNotes: ['Oudh', 'Geranium'],
    baseNotes: ['Amber', 'Musk', 'Sandalwood'],
    sizes: [...defaultSizes],
    category: 'trending',
  },
  {
    id: '1-million',
    name: '1 Million',
    image: '/1 million.jpeg',
    images: ['/1 million.jpeg', '/1 million.jpeg', '/1 million.jpeg'],
    tag: 'Trending',
    description: 'Bold, confident, and magnetic. A power fragrance for those who command attention wherever they go.',
    longDescription: '1 Million is an unapologetic declaration of confidence. A rush of blood orange and spice ignites the senses, while a heart of leather and saffron builds intensity. The dry down of dark wood and amber leaves an impression that\u2019s impossible to forget.',
    notes: ['Leather', 'Spice', 'Wood'],
    topNotes: ['Blood Orange', 'Cardamom'],
    heartNotes: ['Leather', 'Saffron'],
    baseNotes: ['Dark Wood', 'Amber', 'Tonka Bean'],
    sizes: [...defaultSizes],
    category: 'trending',
  },
  {
    id: 'aqua',
    name: 'Aqua',
    image: '/NIYU Aqua.jpeg',
    images: ['/NIYU Aqua.jpeg', '/NIYU Aqua.jpeg', '/NIYU Aqua.jpeg'],
    tag: 'Fresh Pick',
    description: 'Ocean-fresh and invigorating. Perfect for daily wear with a clean, sophisticated finish that lasts all day.',
    longDescription: 'Aqua evokes the first breath of sea air at dawn\u2014crisp, clean, and alive with possibility. Marine accords blend with sparkling citrus and a whisper of white musk, creating a fragrance that feels like endless horizon and open sky.',
    notes: ['Marine', 'Citrus', 'Musk'],
    topNotes: ['Sea Salt', 'Bergamot'],
    heartNotes: ['Marine Accord', 'Iris'],
    baseNotes: ['White Musk', 'Driftwood'],
    sizes: [...defaultSizes],
    category: 'trending',
  },
  {
    id: 'musk',
    name: 'Musk',
    image: '/musk.jpeg',
    images: ['/musk.jpeg', '/musk.jpeg', '/musk.jpeg'],
    tag: "Editor's Choice",
    description: 'Warm, sensual, and deeply comforting. A timeless musk that wraps you in pure elegance.',
    longDescription: 'Musk is the art of intimacy distilled into fragrance. A veil of white musk unfolds over creamy vanilla and smooth sandalwood, creating a scent that feels like being wrapped in the softest cashmere. Quietly powerful, endlessly comforting.',
    notes: ['White Musk', 'Vanilla', 'Sandalwood'],
    topNotes: ['White Musk', 'Aldehydes'],
    heartNotes: ['Vanilla', 'Orris'],
    baseNotes: ['Sandalwood', 'Cashmeran'],
    sizes: [...defaultSizes],
    category: 'trending',
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    image: '/cherry blossom.jpeg',
    images: ['/cherry blossom.jpeg', '/cherry blossom.jpeg', '/cherry blossom.jpeg'],
    tag: 'New Arrival',
    description: 'Delicate floral notes of cherry blossom blended with soft woods for a feminine, enchanting scent.',
    longDescription: 'Cherry Blossom captures the fleeting beauty of spring in full bloom. Petals of Japanese cherry blossom dance with juicy peach and a hint of white woods, creating a fragrance that\u2019s as enchanting as a garden at first light.',
    notes: ['Cherry Blossom', 'Peach', 'White Woods'],
    topNotes: ['Cherry Blossom', 'Lychee'],
    heartNotes: ['Peach Blossom', 'Peony'],
    baseNotes: ['White Woods', 'Musk'],
    sizes: [...defaultSizes],
    category: 'trending',
  },
  {
    id: 'dezire',
    name: 'Dezire',
    image: '/dezire.jpeg',
    images: ['/dezire.jpeg', '/dezire.jpeg', '/dezire.jpeg'],
    description: 'An ode to passion and longing with tender yet powerful notes.',
    longDescription: 'Dezire is the scent of irresistible attraction. A spark of pink pepper and raspberry ignites a heart of tuberose and jasmine, settling into a warm embrace of musk and cedarwood.',
    notes: ['Floral', 'Fruity', 'Musk'],
    topNotes: ['Pink Pepper', 'Raspberry'],
    heartNotes: ['Tuberose', 'Jasmine'],
    baseNotes: ['Musk', 'Cedarwood'],
    sizes: [...defaultSizes],
    category: 'signature',
  },
  {
    id: 'oudh',
    name: 'Oudh',
    image: '/oudh.jpeg',
    images: ['/oudh.jpeg', '/oudh.jpeg', '/oudh.jpeg'],
    description: 'Rich, smoky, and enchanting \u2014 the pure essence of luxury.',
    longDescription: 'Oudh is a journey into the heart of luxury.珍贵的沉香木 (precious agarwood) meets smoky vetiver and warm amber, creating a fragrance that\u2019s as rare and precious as the wood itself.',
    notes: ['Oudh', 'Smoke', 'Amber'],
    topNotes: ['Saffron', 'Cardamom'],
    heartNotes: ['Oudh', 'Rose'],
    baseNotes: ['Amber', 'Vetiver'],
    sizes: [...defaultSizes],
    category: 'signature',
  },
  {
    id: 'creed',
    name: 'Creed',
    image: '/1 million white.jpeg',
    images: ['/1 million white.jpeg', '/1 million white.jpeg', '/1 million white.jpeg'],
    description: 'A majestic fragrance of strength, refinement, and timeless legacy.',
    longDescription: 'Creed is regal composure in a bottle. Fresh citrus meets aromatic herbs and a foundation of precious woods, creating a scent that speaks of heritage and understated power.',
    notes: ['Citrus', 'Herbs', 'Woods'],
    topNotes: ['Lemon', 'Green Apple'],
    heartNotes: ['Lavender', 'Geranium'],
    baseNotes: ['Cedarwood', 'Ambergris'],
    sizes: [...defaultSizes],
    category: 'signature',
  },
]

export default products

export function getProductById(id) {
  return products.find(p => p.id === id)
}

export function getTrendingProducts() {
  return products.filter(p => p.category === 'trending')
}

export function getSignatureProducts() {
  return products
}
