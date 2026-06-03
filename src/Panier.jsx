function Panier({ panier, onVider }) {
  let total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)

  if (panier.length === 0) {
    return (
      <div className="panier">
        <h2>Mon Panier</h2>
        <p>Votre panier est vide.</p>
      </div>
    )
  }

  return (
    <div className="panier">
      <h2>Mon Panier</h2>
      {panier.map(produit => (
        <div key={produit.id} className="panier-item">
          <span>{produit.nom}</span>
          <span>{produit.quantite} x {produit.prix}€</span>
          <span>{produit.quantite * produit.prix}€</span>
        </div>
      ))}
      <p><strong>Total : {total}€</strong></p>
      <button onClick={onVider}>Vider le panier</button>
    </div>
  )
}

export default Panier