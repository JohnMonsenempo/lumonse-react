import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Panier from './Panier'
import Accueil from './pages/Accueil'
import Produits from './pages/Produits'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ProduitDetail from './pages/ProduitDetail'
import { Produit, ProduitPanier, Utilisateur } from './types'

function App() {
  const [panier, setPanier] = useState<ProduitPanier[]>([])
  const [afficherPanier, setAfficherPanier] = useState<boolean>(false)
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(
    JSON.parse(localStorage.getItem('utilisateur') || 'null')
  )

  function ajouterAuPanier(produit: Produit): void {
    setPanier(panierActuel => {
      let existant = panierActuel.find(p => p._id === produit._id)
      if (existant) {
        return panierActuel.map(p =>
          p._id === produit._id ? { ...p, quantite: p.quantite + 1 } : p
        )
      } else {
        return [...panierActuel, { ...produit, quantite: 1 }]
      }
    })
  }

  function viderPanier(): void {
    setPanier([])
  }

  function seDeconnecter(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    setUtilisateur(null)
  }

  let totalQuantite: number = panier.reduce((acc, p) => acc + p.quantite, 0)
  let totalPrix: number = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)

  return (
    <BrowserRouter>
      <header>
        <h1>L U M O N S E</h1>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/produits">Produits</Link>
          <Link to="/contact">Contact</Link>
          {utilisateur ? (
            <>
              <span className="nav-bonjour">
    Bonjour, {utilisateur.nom}
</span>
              <button onClick={seDeconnecter} className="btn">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">S'inscrire</Link>
            </>
          )}
          <button onClick={() => setAfficherPanier(!afficherPanier)}>
            🛒 ({totalQuantite}) — {totalPrix} $
          </button>
        </nav>
      </header>

      {afficherPanier && (
        <Panier panier={panier} onVider={viderPanier} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/produits" element={<Produits onAjouter={ajouterAuPanier} />} />
          <Route path="/produits/:id" element={<ProduitDetail onAjouter={ajouterAuPanier} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App