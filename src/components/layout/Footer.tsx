import { Logo } from './Header'

export default function Footer({ homepage = true }: { homepage?: boolean }) {
  const home = homepage ? '' : '/'
  return <footer>
    <div className="wrap footer-main" data-reveal>
      <div className="footer-brand">
        <a href={`${home}#inicio`}><Logo /></a>
        <p>Cuidado automotriz pensado para acompañarte en cada camino.</p>
      </div>
      <div className="footer-links">
        <p className="footer-title">Explora</p>
        <a href={`${home}#empresa`}>Nuestra empresa</a>
        <a href={`${home}#productos`}>Productos</a>
        <a href={`${home}#equipo`}>Nuestro equipo</a>
      </div>
      <div className="footer-links">
        <p className="footer-title">Hablemos</p>
        <a href={`${home}#contacto`}>Contacto comercial</a>
      </div>
    </div>
    <div className="wrap footer-bottom">
      <span>© {new Date().getFullYear()} MOTRIX. Cuidado automotriz.</span>
      <a href={`${home}#inicio`}>Volver al inicio ↑</a>
    </div>
  </footer>
}
