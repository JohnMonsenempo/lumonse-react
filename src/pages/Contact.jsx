import { useState } from 'react'

function Contact() {
  const [statut, setStatut] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setStatut('Message envoyé avec succès !')
    e.target.reset()
  }

  return (
    <div className="contact-form">
      <h2>Contactez-nous</h2>
      {statut && <p style={{ color: '#2e7d32' }}>{statut}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" required />
        </div>
        <div>
          <label>Message</label>
          <textarea required />
        </div>
        <button type="submit" className="btn">Envoyer</button>
      </form>
    </div>
  )
}

export default Contact