function ProductCard({ nom, prix, image, categorie, onAjouter }) {
  return (
    <div className="product-card">
      <img src={image} alt={nom} />
      <h3>{nom}</h3>
      <p>{prix}€</p>
      <span>{categorie}</span>
      <button onClick={onAjouter}>Ajouter au panier</button>
    </div>
  )
}

export default ProductCard