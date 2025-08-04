# Calculadora de Impostos para Freelancers

Uma calculadora completa para freelancers brasileiros calcularem seus impostos de forma simples e transparente.

## 🚀 Funcionalidades

- Cálculo de ISS (Imposto sobre Serviços)
- Cálculo de IRPF (Imposto de Renda Pessoa Física)
- Cálculo de PIS/COFINS (3,65%)
- Interface responsiva e amigável
- Explicações detalhadas dos cálculos
- Alíquotas personalizadas por cidade e serviço

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** + **Vite**
- **CSS** com design moderno
- **Hooks** personalizados para API calls

### Backend
- **Node.js** + **Express**
- **SQLite** para armazenamento de alíquotas
- **CORS** habilitado

## 📦 Instalação

### Backend

```bash
cd backend
npm install
npm run dev
```

O backend será iniciado na porta 3000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend será iniciado na porta 3001.

## 🚀 Deploy

### Vercel (Frontend)

1. Crie uma conta no [Vercel](https://vercel.com)
2. Importe seu repositório do GitHub
3. Configure as variáveis de ambiente:
   - `VITE_API_URL=https://seu-backend.onrender.com`

### Render (Backend)

1. Crie uma conta no [Render](https://render.com)
2. Importe seu repositório do GitHub
3. Crie um novo Web Service
4. Configure as variáveis de ambiente:
   - `PORT=3000`
   - `NODE_ENV=production`

## 📊 Estrutura do Projeto

```
calculadora-impostos/
├── backend/               # Node.js + Express
│   ├── server.js         # Servidor principal
│   └── package.json      # Dependências do backend
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Hooks personalizados
│   │   └── App.jsx       # App principal
│   └── package.json      # Dependências do frontend
└── README.md             # Documentação
```

## 🔧 Configuração de Ambiente

### Backend

Crie um arquivo `.env` na pasta `backend`:

```env
PORT=3000
NODE_ENV=development
```

### Frontend

Crie um arquivo `.env` na pasta `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

## 📱 Interface

A interface é totalmente responsiva e funciona em:

- Desktop
- Mobile
- Tablets

## 🧪 Testes

Para testar a aplicação localmente:

1. Inicie o backend: `cd backend && npm run dev`
2. Inicie o frontend: `cd frontend && npm run dev`
3. Acesse `http://localhost:3001`

## 📈 Cálculos

### ISS (Imposto sobre Serviços)
- Alíquota varia por cidade (ex: 5% em São Paulo)
- Calculado sobre a receita bruta

### IRPF (Imposto de Renda)
- Tabela progressiva 2024
- Base de cálculo: Receita - Despesas - ISS

### PIS/COFINS
- 3,65% sobre a receita bruta
- Contribuição social fixa

## 🔒 Segurança

- Validação de dados no frontend e backend
- CORS configurado
- Tratamento de erros robusto

## 📞 Suporte

Para dúvidas ou sugestões:

1. Abra uma issue no GitHub
2. Envie um email para: suporte@calculadora-impostos.com

## 📄 Licença

MIT License - 2024

---

**Desenvolvido com ❤️ para freelancers brasileiros**