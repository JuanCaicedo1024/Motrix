import Button from '../ui/Button'

export default function Catalog({ catalog }: { catalog: string }) {
  return <section id="catalogo" className="catalog">
    <div className="wrap catalog-inner">
      <div><p className="eyebrow">Catálogo</p><h2>Catálogo MOTRIX</h2>
        {!catalog && <p>El catálogo PDF aún no está disponible.</p>}
      </div>
      {catalog && <div className="actions flex flex-wrap">
        <Button href={catalog} target="_blank" rel="noopener">Abrir catálogo PDF</Button>
        <Button href={catalog} download secondary>Descargar PDF</Button>
      </div>}
    </div>
  </section>
}
