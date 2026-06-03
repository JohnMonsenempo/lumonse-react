import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Panier from './Panier'
import Accueil from './pages/Accueil'
import Produits from './pages/Produits'
import Contact from './pages/Contact'

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

  let totalQuantite = panier.reduce((acc, p) => acc + p.quantite, 0)
  let totalPrix = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)

  return (
    <BrowserRouter>
      <header>
        <h1>L U M O N S E</h1>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/produits">Produits</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={() => setAfficherPanier(!afficherPanier)}>
            🛒 ({totalQuantite}) — {totalPrix}€
          </button>
        </nav>
      </header>

      {afficherPanier && (
        <Panier panier={panier} onVider={viderPanier} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/produits" element={<Produits produits={produits} onAjouter={ajouterAuPanier} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App