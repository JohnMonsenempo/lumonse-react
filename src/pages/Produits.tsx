import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'
import { Produit } from '../types'

interface ProduitsProps {
  onAjouter: (produit: Produit) => void
}

function Produits({ onAjouter }: ProduitsProps) {
  const [produits, setProduits] = useState<Produit[]>([])
  const [chargement, setChargement] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://lumonse-backend.onrender.com/api/produits')
      .then(res => res.json())
      .then((data: Produit[]) => {
        setProduits(data)
        setChargement(false)
      })
  }, [])

  if (chargement) return <p>Chargement des produits...</p>

  return (
    <div>
      <h2>Nos Produits</h2>
      <div className="product-list">
        {produits.map(produit => (
          <ProductCard
            key={produit._id}
            id={produit._id}
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