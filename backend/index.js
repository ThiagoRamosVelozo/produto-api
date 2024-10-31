
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user:     process.env.POSTGRES_USER,
  host:     process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port:     process.env.POSTGRES_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao tentar conexão\n ', err.stack);
  }
  console.log('Conectou com sucesso');
});

const app = express();
app.use(express.json());

app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO produto (nome, descricao, preco, estoque) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, descricao, preco, estoque]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produto');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const result = await pool.query(
      'UPDATE produto SET nome = $1, descricao = $2, preco = $3, estoque = $4 WHERE id = $5 RETURNING *',
      [nome, descricao, preco, estoque, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM produto WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
