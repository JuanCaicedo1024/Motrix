import { asset, site } from '../../data/site'

export function Logo() {
  return <span className="logo"><img src={asset(site.logo)} alt="MOTRIX — Cuidado que Perdura" width="1254" height="1254" /></span>
}

export default function Header() {
  return <header className="topbar" id="inicio">
    <div className="wrap header-inner flex items-center justify-between">
      <a href="#inicio" className="brand"><Logo /></a>
      <nav aria-label="Navegación principal" className="flex items-center">
        <a href="#inicio">Inicio</a><a href="#productos">Productos</a><a href="#contacto">Contacto</a>
      </nav>
    </div>
  </header>
}
