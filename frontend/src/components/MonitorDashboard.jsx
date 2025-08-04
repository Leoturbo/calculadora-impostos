import React, { useState, useEffect } from 'react'
import performanceMonitor from '../utils/performance'

const MonitorDashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(performanceMonitor.getMetrics())
    }

    // Atualizar métricas a cada 5 segundos
    const interval = setInterval(updateMetrics, 5000)
    updateMetrics() // Atualizar imediatamente

    return () => clearInterval(interval)
  }, [])

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
          fontSize: '12px'
        }}
      >
        📊 Monitor
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '300px',
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      zIndex: 1000,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '12px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h3 style={{ margin: 0, fontSize: '14px' }}>📊 Dashboard de Monitoramento</h3>
        <button
          onClick={toggleVisibility}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>

      {metrics && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <strong>📈 Performance:</strong>
            <div>Tempo médio API: {metrics.averageApiTime.toFixed(2)}ms</div>
            <div>Carregamento página: {metrics.pageLoad?.toFixed(2) || 'N/A'}ms</div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>🔗 API Calls:</strong>
            <div>Total: {metrics.apiCallsCount}</div>
            <div>Sucesso: {metrics.apiCalls.filter(call => call.success).length}</div>
            <div>Falhas: {metrics.apiCalls.filter(call => !call.success).length}</div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>⚠️ Erros:</strong>
            <div>Total: {metrics.errorsCount}</div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>📊 Últimas chamadas API:</strong>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {metrics.apiCalls.slice(-5).map((call, index) => (
                <div key={index} style={{
                  padding: '2px 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '10px'
                }}>
                  {call.success ? '✅' : '❌'} {call.url} - {call.duration.toFixed(2)}ms
                </div>
              ))}
            </div>
          </div>

          <div>
            <strong>📝 Últimos erros:</strong>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {metrics.errors.slice(-3).map((error, index) => (
                <div key={index} style={{
                  padding: '2px 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '10px',
                  color: '#d32f2f'
                }}>
                  {error.message || error.reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonitorDashboard