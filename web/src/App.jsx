import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [jogadoresApi, setJogadoresApi] = useState([]) // Todos vindo da API
  const [selecionadoParaEscalar, setSelecionadoParaEscalar] = useState(null) // Jogador clicado na lista
  
  // Estado das 11 posições do campo (inicialmente vazias)
  // Usamos chaves específicas para mapear no CSS
  const [escalacao, setEscalacao] = useState({
    gk: null,
    def1: null, def2: null, def3: null, def4: null,
    mid1: null, mid2: null, mid3: null,
    fwd1: null, fwd2: null, fwd3: null
  })

  useEffect(() => {
    // Chama sua API Go
    fetch('http://localhost:8080/jogadores')
      .then(res => res.json())
      .then(data => setJogadoresApi(data))
      .catch(err => console.error(err))
  }, [])

  // 1. Clique na lista lateral
  const handleSelectPlayer = (jogador) => {
    setSelecionadoParaEscalar(jogador)
  }

  // 2. Clique na bolinha do campo
  const handlePlacePlayer = (posicaoKey) => {
    // Se já tem alguém, removemos (clique para limpar)
    if (escalacao[posicaoKey]) {
      setEscalacao({ ...escalacao, [posicaoKey]: null })
      return
    }

    // Se não tem ninguém no slot, verificamos se tem alguém selecionado na lista
    if (selecionadoParaEscalar) {
      // Verifica se o jogador já não está em outra posição
      const jaEscalado = Object.values(escalacao).find(j => j?.id === selecionadoParaEscalar.id)
      if (jaEscalado) {
        alert("Esse jogador já está em campo!")
        return
      }

      setEscalacao({ ...escalacao, [posicaoKey]: selecionadoParaEscalar })
      setSelecionadoParaEscalar(null) // Limpa a seleção
    } else {
      alert("Selecione um jogador na lista primeiro!")
    }
  }

  return (
    <div className="container">
      
      {/* LADO ESQUERDO: LISTA DE JOGADORES */}
      <div className="sidebar">
        <h2 style={{color: '#2c3e50', textAlign: 'center'}}>Elenco Disponível</h2>
        <p style={{textAlign: 'center', fontSize: '14px', color: '#7f8c8d'}}>
          {selecionadoParaEscalar 
            ? `Selecionado: ${selecionadoParaEscalar.nome} (Clique no campo)` 
            : "Clique em um jogador abaixo 👇"}
        </p>

        {jogadoresApi.map(jogador => (
          <div 
            key={jogador.id} 
            className="player-card"
            style={{border: selecionadoParaEscalar?.id === jogador.id ? '2px solid #27ae60' : 'none'}}
            onClick={() => handleSelectPlayer(jogador)}
          >
            <img src={jogador.foto} alt={jogador.nome} />
            <div className="player-info">
              <h4>{jogador.nome}</h4>
              <p>{jogador.posicao}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LADO DIREITO: O CAMPO */}
      <div className="field-container">
        <div className="field">
          {/* Mapeando as posições visuais */}
          
          {/* Goleiro */}
          <PositionSlot posicao="gk" jogador={escalacao.gk} onClick={() => handlePlacePlayer('gk')} cssClass="pos-gk" />

          {/* Defesa */}
          <PositionSlot posicao="def1" jogador={escalacao.def1} onClick={() => handlePlacePlayer('def1')} cssClass="pos-de-1" />
          <PositionSlot posicao="def2" jogador={escalacao.def2} onClick={() => handlePlacePlayer('def2')} cssClass="pos-de-2" />
          <PositionSlot posicao="def3" jogador={escalacao.def3} onClick={() => handlePlacePlayer('def3')} cssClass="pos-de-3" />
          <PositionSlot posicao="def4" jogador={escalacao.def4} onClick={() => handlePlacePlayer('def4')} cssClass="pos-de-4" />

          {/* Meio */}
          <PositionSlot posicao="mid1" jogador={escalacao.mid1} onClick={() => handlePlacePlayer('mid1')} cssClass="pos-mid-1" />
          <PositionSlot posicao="mid2" jogador={escalacao.mid2} onClick={() => handlePlacePlayer('mid2')} cssClass="pos-mid-2" />
          <PositionSlot posicao="mid3" jogador={escalacao.mid3} onClick={() => handlePlacePlayer('mid3')} cssClass="pos-mid-3" />

          {/* Ataque */}
          <PositionSlot posicao="fwd1" jogador={escalacao.fwd1} onClick={() => handlePlacePlayer('fwd1')} cssClass="pos-fwd-1" />
          <PositionSlot posicao="fwd2" jogador={escalacao.fwd2} onClick={() => handlePlacePlayer('fwd2')} cssClass="pos-fwd-2" />
          <PositionSlot posicao="fwd3" jogador={escalacao.fwd3} onClick={() => handlePlacePlayer('fwd3')} cssClass="pos-fwd-3" />
        </div>
      </div>
    </div>
  )
}

// Componente auxiliar para a bolinha
function PositionSlot({ jogador, onClick, cssClass }) {
  return (
    <div className={`position-slot ${cssClass} ${jogador ? 'filled' : ''}`} onClick={onClick}>
      {jogador ? (
        <>
          <img src={jogador.foto} alt={jogador.nome} />
          <div className="player-name-tag">{jogador.nome}</div>
        </>
      ) : (
        <span style={{color: 'white', fontSize: '20px'}}>+</span>
      )}
    </div>
  )
}

export default App