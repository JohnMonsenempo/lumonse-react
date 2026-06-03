import { Link } from 'react-router-dom'

function Accueil() {
  return (
    <div>
      <section className="hero">
        <h2>Bienvenue chez LUMONSE</h2>
        <p>Découvrez notre collection de vêtements tendance et de qualité.</p>
        <Link to="/produits" className="btn">Voir les produits</Link>
      </section>
    </div>
  )
}

export default Accueil