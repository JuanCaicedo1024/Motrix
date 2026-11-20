import { useEffect } from 'react'
import type { Product } from '../../data/products'
import { asset } from '../../data/site'
import Button from '../ui/Button'

export default function ProductDetail({ product }: { product: Product }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${product.name} | MOTRIX`
    return () => { document.title = previousTitle }
  }, [product.name])

  return <main className="product-detail-page">
    <div className="wrap">
      <nav className="product-breadcrumbs" aria-label="Ruta de navegación">
        <a href="/#inicio">Inicio</a><span aria-hidden="true">/</span>
        <a href="/#productos">Productos</a><span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <section className="product-detail-grid" aria-labelledby="product-title">
        <div className="product-detail-media" data-reveal>
          {product.photo
            ? <img src={asset(product.photo)} alt={product.name} />
            : <div className="product-detail-placeholder">
              <span className="product-detail-brand">MOTRIX <span>®</span></span>
              <span className="product-detail-mark" aria-hidden="true">M</span>
              <span className="product-detail-caption">{product.category} · Imagen próximamente</span>
            </div>}
        </div>
        <div className="product-detail-copy" data-reveal>
          <p className="eyebrow">{product.category}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail-description">
            Producto de la línea MOTRIX para el cuidado automotriz. Consulta con nuestro equipo
            comercial la presentación, disponibilidad y recomendaciones de uso.
          </p>
          <div className="product-purchase-panel">
            <span className="purchase-label">Precio</span>
            <strong>{product.price || 'Consultar'}</strong>
            <p>Presentación y disponibilidad sujetas a confirmación comercial.</p>
            <Button href="/#contacto" className="button-purchase">Consultar este producto <span aria-hidden="true">→</span></Button>
          </div>
          <div className="product-detail-meta">
            <span><i aria-hidden="true">01</i> Cuidado automotriz MOTRIX</span>
            <span><i aria-hidden="true">02</i> Información comercial por confirmar</span>
          </div>
        </div>
      </section>
      <section className="product-information" aria-label="Información del producto" data-reveal>
        <div>
          <p className="eyebrow">Más información</p>
          <h2>¿Tienes dudas sobre este producto?</h2>
        </div>
        <div>
          <p>Escríbenos para consultar precio, presentación y disponibilidad.</p>
          <Button href="/#contacto" secondary>Ir a contacto</Button>
        </div>
      </section>
    </div>
  </main>
}
