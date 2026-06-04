import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Panier from './Panier'
import Accueil from './pages/Accueil'
import Produits from './pages/Produits'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ProduitDetail from './pages/ProduitDetail'
function App() {
  const [panier, setPanier] = useState([])
  const [afficherPanier, setAfficherPanier] = useState(false)
  const [utilisateur, setUtilisateur] = useState(
    JSON.parse(localStorage.getItem('utilisateur')) || null
  )

  function ajouterAuPanier(produit) {
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

  function viderPanier() {
    setPanier([])
  }

  function seDeconnecter() {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    setUtilisateur(null)
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
          {utilisateur ? (
            <>
              <span style={{ color: '#C9A96E', fontSize: '13px' }}>
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
          <Route path="/produits" element={<Produits onAjouter={ajouterAuPanier} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/produits/:id" element={<ProduitDetail onAjouter={ajouterAuPanier} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App