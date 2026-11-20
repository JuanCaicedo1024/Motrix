import { asset, site } from '../../data/site'

export function Logo() {
  return <span className="logo"><img src={asset(site.logo)} alt="MOTRIX — Cuidado que Perdura" width="1254" height="1254" /></span>
}

export default function Header({ homepage = true }: { homepage?: boolean }) {
  const home = homepage ? '' : '/'
  return <header className="topbar" id="inicio">
    <div className="wrap header-inner flex items-center justify-between">
      <a href={`${home}#inicio`} className="brand"><Logo /></a>
      <nav aria-label="Navegación principal" className="flex items-center">
        <a href={`${home}#inicio`}>Inicio</a><a href={`${home}#empresa`}>Empresa</a><a href={`${home}#productos`}>Productos</a><a href={`${home}#equipo`}>Equipo</a>
      </nav>
      <a className="header-contact" href={`${home}#contacto`}>Contacto comercial</a>
    </div>
  </header>
}
