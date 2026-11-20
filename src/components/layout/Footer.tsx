import { Logo } from './Header'

export default function Footer() {
  return <footer><div className="wrap footer-inner flex flex-wrap items-center justify-between gap-5">
    <a href="#inicio"><Logo /></a>
    <span>Cuidado automotriz</span>
  </div></footer>
}
