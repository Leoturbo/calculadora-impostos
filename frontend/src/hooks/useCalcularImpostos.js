import { useState } from 'react'
import performanceMonitor from '../utils/performance'

export default function useCalcularImpostos() {
  const [resultados, setResultados] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const calcular = async (dados) => {
    const startTime = performance.now()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/calcular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
      })
      
      if (!response.ok) {
        throw new Error('Erro ao calcular impostos')
      }
      
      const data = await response.json()
      performanceMonitor.trackApiCall('/calcular', { method: 'POST' }, startTime)
      setResultados(data)
    } catch (err) {
      console.error('Erro na API:', err)
      performanceMonitor.trackApiError('/calcular', { method: 'POST' }, err, startTime)
      setError('Não foi possível calcular os impostos. Verifique sua conexão e tente novamente.')
      setResultados(null)
    } finally {
      setLoading(false)
    }
  }

  return { resultados, calcular, loading, error }
}