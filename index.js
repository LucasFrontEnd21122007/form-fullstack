const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/cadastroDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const newUser = new User({ nome, email, senha });
        await newUser.save();
        res.send('Cadastro realizado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar usuário.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
