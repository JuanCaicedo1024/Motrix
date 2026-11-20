import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'

export default function Products() {
  return <section id="productos" className="portfolio">
    <div className="wrap">
      <p className="eyebrow" data-reveal>Portafolio</p>
      <h2 data-reveal>Productos MOTRIX</h2>
      <div className="product-grid grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </div>
  </section>
}
