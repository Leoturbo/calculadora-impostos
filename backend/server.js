const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const { logRequest, logError, log } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logRequest);

// Conectar ao banco de dados
const db = new sqlite3.Database('./database/aliquotas.db');

// Criar tabelas se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cidades (
    nome TEXT,
    servico TEXT,
    aliquota REAL
  )`);
  
  // Inserir dados iniciais se a tabela estiver vazia
  db.get("SELECT COUNT(*) as count FROM cidades", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO cidades VALUES (?, ?, ?)");
      stmt.run('São Paulo', 'Consultoria', 0.05);
      stmt.run('São Paulo', 'Design', 0.05);
      stmt.run('São Paulo', 'Programação', 0.05);
      stmt.run('Rio de Janeiro', 'Consultoria', 0.05);
      stmt.run('Rio de Janeiro', 'Design', 0.05);
      stmt.run('Rio de Janeiro', 'Programação', 0.05);
      stmt.run('Belo Horizonte', 'Consultoria', 0.04);
      stmt.run('Belo Horizonte', 'Design', 0.04);
      stmt.run('Belo Horizonte', 'Programação', 0.04);
      stmt.finalize();
    }
  });
});

// Rota principal de cálculo
app.post('/calcular', (req, res) => {
  try {
    const { receita, cidade, servico, despesas } = req.body;
    
    if (!receita || !cidade || !servico) {
      return res.status(400).json({ error: 'Campos obrigatórios: receita, cidade, servico' });
    }

    const iss = calcularISS(receita, cidade, servico);
    const baseIRPF = receita - despesas - iss;
    const irpf = calcularIRPF(baseIRPF);
    const pisCofins = receita * 0.0365; // PIS/Cofins 3,65%
    
    const total = iss + irpf + pisCofins;

    res.json({
      iss: iss.toFixed(2),
      irpf: irpf.toFixed(2),
      pisCofins: pisCofins.toFixed(2),
      total: total.toFixed(2),
      baseIRPF: baseIRPF.toFixed(2)
    });
  } catch (error) {
    console.error('Erro no cálculo:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota para obter cidades e serviços disponíveis
app.get('/aliquotas', (req, res) => {
  db.all("SELECT DISTINCT nome FROM cidades ORDER BY nome", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
    
    const cidades = rows.map(row => row.nome);
    res.json({ cidades });
  });
});

// Funções de cálculo
function calcularISS(receita, cidade, servico) {
  return new Promise((resolve, reject) => {
    const query = "SELECT aliquota FROM cidades WHERE nome = ? AND servico = ?";
    db.get(query, [cidade, servico], (err, row) => {
      if (err) {
        reject(err);
      } else {
        const aliquota = row ? row.aliquota : 0.05; // Padrão 5% se não encontrar
        resolve(receita * aliquota);
      }
    });
  });
}

function calcularIRPF(base) {
  if (base <= 2112) return 0;
  if (base <= 2826.65) return base * 0.075 - 158.40;
  if (base <= 3751.05) return base * 0.15 - 370.40;
  if (base <= 4664.68) return base * 0.225 - 651.73;
  return base * 0.275 - 884.96; // Acima de R$ 4.664,68
}

// Iniciar servidor
app.listen(PORT, () => {
  log('info', `Servidor iniciado na porta ${PORT}`);
  console.log(`Backend rodando na porta ${PORT}`);
});

// Middleware de tratamento de erros
app.use(logError);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rota para logs (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.get('/logs', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const logFile = path.join(__dirname, '../logs', `app-${new Date().toISOString().split('T')[0]}.log`);
    
    if (fs.existsSync(logFile)) {
      const logs = fs.readFileSync(logFile, 'utf8');
      res.send(logs);
    } else {
      res.send('Nenhum log encontrado para hoje');
    }
  });
}