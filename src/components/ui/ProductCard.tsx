import { asset } from '../../data/site'
import type { Product } from '../../data/products'

export default function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <div className="product-media">
      {product.photo
        ? <img src={asset(product.photo)} alt={product.name} loading="lazy" />
        : <span>Foto pendiente</span>}
    </div>
    <div className="product-copy">
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      {product.presentation && <p>{product.presentation}</p>}
      {product.price && <p>{product.price}</p>}
    </div>
  </article>
}
