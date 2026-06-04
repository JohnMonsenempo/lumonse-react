import { useNavigate } from 'react-router-dom'

function ProductCard({ id, nom, prix, image, categorie, onAjouter }) {
  const navigate = useNavigate()

  return (
    <div className="product-card">
      <div className="product-card-image" onClick={() => navigate(`/produits/${id}`)}>
        <img src={image} alt={nom} />
        <div className="product-card-overlay">
          <span>Voir le produit</span>
        </div>
      </div>
      <div className="product-card-info">
        <h3>{nom}</h3>
        <p>{prix} $</p>
        <button onClick={onAjouter}>Ajouter au panier</button>
      </div>
    </div>
  )
}

export default ProductCard