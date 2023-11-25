const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cadastroDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User schema
const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
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
