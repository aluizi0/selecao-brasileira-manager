import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [jogadores, setJogadores] = useState([])

  useEffect(() => {
    // Busca os dados da nossa API em Go
    fetch('http://localhost:8080/jogadores')
      .then(response => response.json())
      .then(data => setJogadores(data))
      .catch(error => console.error("Erro ao buscar jogadores:", error))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#228B22' }}>🇧🇷 Convocados para a Copa 🇧🇷</h1>
      <p>Gerenciado via API em Go</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {jogadores.map(jogador => (
          <div key={jogador.id} style={{ border: '2px solid #FFD700', borderRadius: '10px', padding: '15px', backgroundColor: '#f9f9f9' }}>
            <h3>{jogador.nome}</h3>
            <p><strong>Posição:</strong> {jogador.posicao}</p>
            <p><strong>Clube:</strong> {jogador.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App