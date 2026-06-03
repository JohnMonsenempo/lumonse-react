import { useState } from 'react'

function Compteur({ titre }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>{titre}</h3>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>Ajouter 1</button>
      <button onClick={() => setCount(0)}>Réinitialiser</button>
    </div>
  )
}

export default Compteur