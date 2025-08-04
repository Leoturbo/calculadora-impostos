import React from 'react'

export default function Resultados({ resultados }) {
  const formatarMoeda = (valor) => {
    return `R$ ${parseFloat(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  const getAliquotaISS = (receita, iss) => {
    return ((iss / receita) * 100).toFixed(1)
  }

  const getAliquotaIRPF = (baseIRPF, irpf) => {
    if (baseIRPF <= 0) return '0,0'
    return ((irpf / baseIRPF) * 100).toFixed(1)
  }

  return (
    <div className="results show">
      <h3>Resumo dos Impostos</h3>
      
      <div className="result-item">
        <span>ISS (Imposto sobre Serviços):</span>
        <span>{formatarMoeda(resultados.iss)} ({getAliquotaISS(resultados.baseIRPF + parseFloat(resultados.iss) + parseFloat(resultados.irpf), resultados.iss)}%)</span>
      </div>
      
      <div className="result-item">
        <span>IRPF (Imposto de Renda):</span>
        <span>{formatarMoeda(resultados.irpf)} ({getAliquotaIRPF(resultados.baseIRPF, resultados.irpf)}%)</span>
      </div>
      
      <div className="result-item">
        <span>PIS/COFINS:</span>
        <span>{formatarMoeda(resultados.pisCofins)} (3,65%)</span>
      </div>
      
      <div className="result-item">
        <span>Total de Impostos:</span>
        <span>{formatarMoeda(resultados.total)}</span>
      </div>

      <div className="result-item">
        <span>Receita Líquida:</span>
        <span>{formatarMoeda((resultados.baseIRPF + parseFloat(resultados.iss) + parseFloat(resultados.irpf) + parseFloat(resultados.pisCofins)) - resultados.total)}</span>
      </div>

      <div className="explanation">
        <h4>Como calculamos:</h4>
        <ul>
          <li><strong>ISS:</strong> Imposto sobre Serviços. Alíquota varia por cidade (ex: 5% em São Paulo)</li>
          <li><strong>IRPF:</strong> Imposto de Renda Pessoa Física. Calculado sobre (Receita - Despesas - ISS) usando tabela progressiva</li>
          <li><strong>PIS/COFINS:</strong> Contribuição social. 3,65% sobre a receita bruta</li>
          <li><strong>Base de Cálculo IRPF:</strong> R$ {formatarMoeda(resultados.baseIRPF)}</li>
        </ul>
        
        <h4>Observações:</h4>
        <ul>
          <li>Valores aproximados. Consulte um contador para cálculos precisos</li>
          <li>Podem existir outras deduções permitidas por lei</li>
          <li>Valores sujeitos a alterações na legislação</li>
        </ul>
      </div>
    </div>
  )
}