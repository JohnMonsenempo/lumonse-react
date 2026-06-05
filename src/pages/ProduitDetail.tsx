import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Produit } from '../types'

interface ProduitDetailProps {
  onAjouter: (produit: Produit) => void
}

function ProduitDetail({ onAjouter }: ProduitDetailProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [produit, setProduit] = useState<Produit | null>(null)
  const [chargement, setChargement] = useState<boolean>(true)

  useEffect(() => {
    fetch(`https://lumonse-backend.onrender.com/api/produits/${id}`)
      .then(res => res.json())
      .then((data: Produit) => {
        setProduit(data)
        setChargement(false)
      })
  }, [id])

  if (chargement) return <p>Chargement...</p>
  if (!produit) return <p>Produit non trouvé.</p>

  return (
    <div className="produit-detail">
      <button className="retour" onClick={() => navigate('/produits')}>
        ← Retour aux produits
      </button>
      <div className="produit-detail-contenu">
        <div className="produit-detail-image">
          <img src={produit.image} alt={produit.nom} />
        </div>
        <div className="produit-detail-info">
          <span className="produit-categorie">{produit.categorie}</span>
          <h2>{produit.nom}</h2>
          <p className="produit-prix">{produit.prix} $</p>
          <p className="produit-description">
            Pièce incontournable de la collection LUMONSE. 
            Fabriquée avec des matériaux de qualité supérieure 
            pour un style élégant et durable.
          </p>
          <button className="btn" onClick={() => {
            onAjouter(produit)
            navigate('/produits')
          }}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProduitDetail