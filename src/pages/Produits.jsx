import ProductCard from '../ProductCard'

function Produits({ produits, onAjouter }) {
  return (
    <div>
      <h2>Nos Produits</h2>
      <div className="product-list">
        {produits.map(produit => (
          <ProductCard
            key={produit.id}
            nom={produit.nom}
            prix={produit.prix}
            image={produit.image}
            categorie={produit.categorie}
            onAjouter={() => onAjouter(produit)}
          />
        ))}
      </div>
    </div>
  )
}

export default Produits