import { asset } from '../../data/site'
import type { Product } from '../../data/products'

export default function ProductCard({ product }: { product: Product }) {
  return <a className="product-card" data-reveal href={`/productos/${product.id}`} aria-label={`Ver detalles de ${product.name}`}>
    <div className="product-media">
      {product.photo
        ? <img src={asset(product.photo)} alt={product.name} loading="lazy" />
        : <span>Imagen próximamente</span>}
      <span className="product-quick-view">Ver producto <span aria-hidden="true">↗</span></span>
    </div>
    <div className="product-copy">
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      {product.presentation && <p>{product.presentation}</p>}
      {product.price && <p>{product.price}</p>}
      <span className="product-link">Ver detalles <span aria-hidden="true">→</span></span>
    </div>
  </a>
}
