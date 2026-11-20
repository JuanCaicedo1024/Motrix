const values = [
  {
    number: '01',
    title: 'Calidad',
    description: 'Buscamos que cada producto responda a las necesidades reales del cuidado automotriz.',
  },
  {
    number: '02',
    title: 'Compromiso',
    description: 'Trabajamos con dedicación para ofrecer una experiencia clara, útil y confiable.',
  },
  {
    number: '03',
    title: 'Evolución',
    description: 'Escuchamos a quienes confían en nosotros para seguir mejorando cada día.',
  },
]

export default function Company() {
  return <section id="empresa" className="company">
    <div className="wrap">
      <div className="company-intro" data-reveal>
        <div>
          <p className="eyebrow">Quiénes somos</p>
          <h2>Cuidado automotriz con propósito.</h2>
        </div>
        <p className="company-lead">
          MOTRIX es una marca dedicada al cuidado y mantenimiento de vehículos.
          Creamos soluciones para que mantener cada vehículo en buen estado sea
          más sencillo, con productos pensados para acompañar la rutina de cuidado.
        </p>
      </div>
      <div className="purpose-grid">
        <article className="purpose-card" data-reveal>
          <p className="category">Nuestro propósito</p>
          <h3>Misión</h3>
          <p>Facilitar el cuidado automotriz con productos prácticos y accesibles, acompañando a cada persona en la limpieza y el mantenimiento de su vehículo.</p>
        </article>
        <article className="purpose-card purpose-card-highlight" data-reveal>
          <p className="category">Hacia dónde vamos</p>
          <h3>Visión</h3>
          <p>Ser una marca cercana y reconocida por hacer del cuidado automotriz una experiencia confiable, sencilla y constante.</p>
        </article>
      </div>
      <div className="values-block">
        <div className="values-heading" data-reveal>
          <p className="eyebrow">Lo que nos mueve</p>
          <h3>Nuestros valores</h3>
        </div>
        <div className="values-grid">
          {values.map(value => <article className="value-card" data-reveal key={value.number}>
            <span className="value-number">{value.number}</span>
            <h4>{value.title}</h4>
            <p>{value.description}</p>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}
