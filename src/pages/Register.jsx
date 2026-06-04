import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ nom: '', email: '', motDePasse: '' })
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await fetch('https://lumonse-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      let data = await response.json()

      if (!response.ok) {
        setErreur(data.message)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur))
      navigate('/')
    } catch (err) {
      setErreur('Erreur de connexion au serveur')
    }
  }

  return (
    <div className="auth-form">
      <h2>Créer un compte</h2>
      {erreur && <p className="erreur">{erreur}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="motDePasse"
            value={form.motDePasse}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Créer mon compte</button>
      </form>
      <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
    </div>
  )
}

export default Register