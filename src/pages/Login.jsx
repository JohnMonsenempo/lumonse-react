import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', motDePasse: '' })
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await fetch('https://lumonse-backend.onrender.com/api/auth/login', {
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
      <h2>Se connecter</h2>
      {erreur && <p className="erreur">{erreur}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn">Se connecter</button>
      </form>
      <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
    </div>
  )
}

export default Login