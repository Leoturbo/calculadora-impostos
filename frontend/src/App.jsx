import React, { useState } from 'react'
import Formulario from './components/Formulario'
import Resultados from './components/Resultados'
import useCalcularImpostos from './hooks/useCalcularImpostos'
import MonitorDashboard from './components/MonitorDashboard'

function App() {
  const [dados, setDados] = useState({
    receita: '',
    cidade: 'São Paulo',
    servico: 'Consultoria',
    despesas: ''
  })
  
  const { resultados, calcular, loading, error } = useCalcularImpostos()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDados(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    calcular(dados)
  }

  return (
    <div className="container">
      <h1>Calculadora de Impostos para Freelancers</h1>
      
      <Formulario
        dados={dados}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      
      {error && (
        <div className="error" style={{
          color: 'red',
          padding: '10px',
          margin: '20px 0',
          border: '1px solid red',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {resultados && <Resultados resultados={resultados} />}
      
      <MonitorDashboard />
    </div>
  )
}

export default App