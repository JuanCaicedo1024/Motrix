const areas = [
  {
    number: '01',
    title: 'Desarrollo de producto',
    description: 'Identificamos necesidades de cuidado para construir un portafolio útil para distintos momentos y superficies del vehículo.',
  },
  {
    number: '02',
    title: 'Asesoría comercial',
    description: 'Orientamos a clientes y aliados para encontrar las opciones adecuadas para sus necesidades.',
  },
  {
    number: '03',
    title: 'Experiencia de marca',
    description: 'Cuidamos cada punto de contacto para que relacionarse con MOTRIX sea simple y consistente.',
  },
]

export default function Team() {
  return <section id="equipo" className="team">
    <div className="wrap">
      <div className="team-heading">
        <div data-reveal>
          <p className="eyebrow">Personas y propósito</p>
          <h2>Un equipo que cuida cada detalle.</h2>
        </div>
        <p data-reveal>Detrás de MOTRIX hay distintas áreas trabajando con un mismo objetivo: hacer que el cuidado de tu vehículo sea más fácil.</p>
      </div>
      <div className="team-grid">
        {areas.map(area => <article className="team-card" data-reveal key={area.number}>
          <span className="team-number">{area.number}</span>
          <div className="team-card-rule" aria-hidden="true" />
          <h3>{area.title}</h3>
          <p>{area.description}</p>
        </article>)}
      </div>
    </div>
  </section>
}
