const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuração do cliente PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

app.post('/saveData', (req, res) => {
    const { playerName, date, round } = req.body;

    const query = `
        INSERT INTO Alunos (nome, data, fazes)
        VALUES ($1, $2, $3)
    `;
    const values = [playerName, date, round];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados');
        } else {
            console.log('Dados inseridos com sucesso:', result);
            res.status(200).send('Dados inseridos com sucesso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
