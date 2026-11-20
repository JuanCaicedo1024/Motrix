import { useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Company from './components/sections/Company'
import Team from './components/sections/Team'
import Products from './components/sections/Products'
import Contact from './components/sections/Contact'
import ProductDetail from './components/sections/ProductDetail'
import { products } from './data/products'

export default function App() {
  const productId = window.location.pathname.match(/^\/productos\/([^/]+)\/?$/)?.[1]
  const selectedProduct = products.find(product => product.id === productId)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements.length) return

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' })

    elements.forEach(element => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return <>
    <Header homepage={!selectedProduct} />
    {selectedProduct
      ? <ProductDetail product={selectedProduct} />
      : <main>
        <Hero />
        <Company />
        <Products />
        <Team />
        <Contact />
      </main>}
    <Footer homepage={!selectedProduct} />
  </>
}
