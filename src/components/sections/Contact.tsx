import { site } from '../../data/site'
import Button from '../ui/Button'

export default function Contact() {
  const { phone, whatsapp, instagram, facebook, location, map } = site.contact
  const available = phone || whatsapp || instagram || facebook || location || map
  return <section id="contacto" className="contact wrap">
    <h2>Contacto comercial</h2>
    {available ? <>
      {location && <p>{location}</p>}
      <div className="actions flex flex-wrap">
        {phone && <Button secondary href={`tel:${phone}`}>{phone}</Button>}
        {whatsapp && <Button href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener">WhatsApp</Button>}
        {instagram && <Button secondary href={instagram} target="_blank" rel="noopener">Instagram</Button>}
        {facebook && <Button secondary href={facebook} target="_blank" rel="noopener">Facebook</Button>}
        {map && <Button secondary href={map} target="_blank" rel="noopener">Ver ubicación</Button>}
      </div>
    </> : <p>Los canales comerciales se publicarán aquí cuando estén disponibles.</p>}
  </section>
}
