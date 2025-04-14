// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexão com banco MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Altere conforme seu usuário
  password: '',        // Altere conforme sua senha
  database: 'calibration_app'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso.');
  }
});

// Rota POST para salvar dados
app.post('/calibracao', (req, res) => {
  const dados = req.body;
  const sql = `INSERT INTO calibrations SET ?`;
  db.query(sql, dados, (err, result) => {
    if (err) {
      console.error('Erro ao salvar dados:', err);
      res.status(500).send('Erro ao salvar dados');
    } else {
      res.status(201).send('Dados salvos com sucesso');
    }
  });
});

// Rota GET para listar dados
app.get('/calibracao', (req, res) => {
  db.query('SELECT * FROM calibrations', (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
