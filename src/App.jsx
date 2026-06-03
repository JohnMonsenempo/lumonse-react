import { useState } from 'react'
import ProductCard from './ProductCard'
import Panier from './Panier'

const produits = [
  { id: 1, nom: "Veste en cuir", prix: 99, image: "/product1.jpg", categorie: "vestes" },
  { id: 2, nom: "Manteau d'hiver", prix: 149, image: "/product2.jpg", categorie: "manteaux" },
  { id: 3, nom: "Robe élégante", prix: 79, image: "/product3.jpg", categorie: "robes" }
]

function App() {
  const [panier, setPanier] = useState([])
  const [afficherPanier, setAfficherPanier] = useState(false)

  function ajouterAuPanier(produit) {
    setPanier(panierActuel => {
      let existant = panierActuel.find(p => p.id === produit.id)
      if (existant) {
        return panierActuel.map(p =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        )
      } else {
        return [...panierActuel, { ...produit, quantite: 1 }]
      }
    })
  }

  function viderPanier() {
    setPanier([])
  }

  let total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)

  return (
    <div>
      <h1>LUMONSE</h1>
      <button onClick={() => setAfficherPanier(!afficherPanier)}>
        🛒 Panier ({panier.reduce((acc, p) => acc + p.quantite, 0)}) — {total}€
      </button>

      {afficherPanier && (
        <Panier panier={panier} onVider={viderPanier} />
      )}

      <div className="product-list">
        {produits.map(produit => (
          <ProductCard
            key={produit.id}
            nom={produit.nom}
            prix={produit.prix}
            image={produit.image}
            categorie={produit.categorie}
            onAjouter={() => ajouterAuPanier(produit)}
          />
        ))}
      </div>
    </div>
  )
}

export default App