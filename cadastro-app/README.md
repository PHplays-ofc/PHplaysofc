# Cadastro App (Frontend + Backend)

## Estrutura
- `frontend/` - contém `index.html` e `style.css` (seu design enviado)
- `backend/` - Node.js + Express + TypeScript

## Como usar

1. Instale o MySQL e crie o banco:
```sql
CREATE DATABASE cadastro_db;
USE cadastro_db;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);
```

2. Backend:
```bash
cd backend
cp .env.example .env   # e edite com suas credenciais
npm install
npm run dev
```

3. Frontend:
Abra `frontend/index.html` no navegador (ou sirva por um servidor estático).
O formulário fará POST para `http://localhost:3000/cadastro`.

> Observação: em produção, nunca guarde senhas em texto puro. Use hashing (bcrypt) e HTTPS.
