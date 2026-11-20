import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Products from './components/sections/Products'
import Catalog from './components/sections/Catalog'
import Contact from './components/sections/Contact'
import { useCatalog } from './hooks/useCatalog'

export default function App() {
  const catalog = useCatalog()
  return <>
    <Header />
    <main>
      <Hero catalog={catalog} />
      <Products />
      <Catalog catalog={catalog} />
      <Contact />
    </main>
    <Footer />
  </>
}
