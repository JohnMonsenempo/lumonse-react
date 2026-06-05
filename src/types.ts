export interface Produit {
    _id: string
    nom: string
    prix: number
    image: string
    categorie: string
}

export interface ProduitPanier extends Produit {
    quantite: number
}

export interface Utilisateur {
    id: string
    nom: string
    email: string
}