import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import SceneFallback from '../three/SceneFallback'
import Button from '../ui/Button'
import { asset, site } from '../../data/site'

const HeroScene = lazy(() => import('../three/HeroScene'))

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [fine, setFine] = useState(false)
  const [supported, setSupported] = useState(false)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)')
    const sync = () => { setReduced(motion.matches); setFine(pointer.matches) }
    sync()
    motion.addEventListener('change', sync)
    pointer.addEventListener('change', sync)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    if (stage.current) observer.observe(stage.current)
    setSupported('WebGL2RenderingContext' in window)
    return () => {
      motion.removeEventListener('change', sync)
      pointer.removeEventListener('change', sync)
      observer.disconnect()
    }
  }, [])

  const renderScene = supported && visible && !reduced && !failed
  return <section className="hero" aria-labelledby="hero-title">
    <div className="wrap hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Cuidado automotriz</p>
        <h1 id="hero-title">Cuidado que <strong>Perdura<span aria-hidden="true">.</span></strong></h1>
        <p className="hero-description">Productos para la limpieza, el cuidado y el mantenimiento de tu vehículo.</p>
        <div className="actions flex flex-wrap">
          <Button href={asset(site.catalog)} target="_blank" rel="noopener" secondary>Ver catálogo PDF</Button>
          <Button href="#productos">Explorar productos</Button>
        </div>
      </div>
      <figure className="hero-figure">
        <div className="stage" ref={stage}>
          <SceneFallback hidden={ready && renderScene} />
          {renderScene && <div className={`interactive-scene ${ready ? 'is-ready' : ''}`} aria-hidden="true">
            <SceneBoundary onFailure={() => { setFailed(true); setReady(false) }}>
              <Suspense fallback={null}>
                <HeroScene fine={fine} onReady={setReady} onFailure={setFailed} />
              </Suspense>
            </SceneBoundary>
          </div>}
        </div>
        <figcaption>Deportivo y envase · Escena 3D conceptual</figcaption>
      </figure>
    </div>
    <div className="hero-edge" aria-hidden="true" />
  </section>
}


