import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'

function Produits({ onAjouter }) {
  const [produits, setProduits] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/produits')
      .then(res => res.json())
      .then(data => {
        setProduits(data)
        setChargement(false)
      })
  }, [])

  if (chargement) {
    return <p>Chargement des produits...</p>
  }

  return (
    <div>
      <h2>Nos Produits</h2>
      <div className="product-list">
        {produits.map(produit => (
          <ProductCard
            key={produit._id}
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