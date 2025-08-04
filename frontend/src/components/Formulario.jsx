import React from 'react'

const servicos = [
  'Consultoria',
  'Design',
  'Programação',
  'Marketing',
  'Redação',
  'Tradução',
  'Outros'
]

const cidades = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Porto Alegre',
  'Curitiba',
  'Salvador',
  'Brasília',
  'Outra'
]

export default function Formulario({ dados, handleChange, handleSubmit, loading }) {
  const formatarMoeda = (valor) => {
    return valor.replace(/\D/g, '').replace(/(\d{1,2})$/, ',$1')
  }

  const handleReceitaChange = (e) => {
    const valor = formatarMoeda(e.target.value)
    handleChange({ ...e, target: { ...e.target, value: valor } })
  }

  const handleDespesasChange = (e) => {
    const valor = formatarMoeda(e.target.value)
    handleChange({ ...e, target: { ...e.target, value: valor } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="receita">Receita Bruta (R$)</label>
        <input
          type="text"
          id="receita"
          name="receita"
          value={dados.receita}
          onChange={handleReceitaChange}
          placeholder="5.000,00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cidade">Cidade</label>
        <select
          id="cidade"
          name="cidade"
          value={dados.cidade}
          onChange={handleChange}
          required
        >
          {cidades.map(cidade => (
            <option key={cidade} value={cidade}>{cidade}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="servico">Serviço</label>
        <select
          id="servico"
          name="servico"
          value={dados.servico}
          onChange={handleChange}
          required
        >
          {servicos.map(servico => (
            <option key={servico} value={servico}>{servico}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="despesas">Despesas Dedutíveis (R$)</label>
        <input
          type="text"
          id="despesas"
          name="despesas"
          value={dados.despesas}
          onChange={handleDespesasChange}
          placeholder="1.000,00"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Calculando...' : 'Calcular Impostos'}
      </button>
    </form>
  )
}