const express = require('express');
const path = require('path');

const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware para servir arquivos estáticos (CSS, imagens, etc)
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// Dados "banco" para exemplo
let usuarios = [
    { id: 1, nome: "Kauã", email: "kaua@etec.gov.sp.br" },
    { id: 2, nome: "alguem", email: "alguem@etec.gov.sp.br" }
];

// Rotas principais
app.get('/', (req, res) => res.render('index'));
app.get('/integrantes', (req, res) => res.render('integrantes'));
app.get('/componente1', (req, res) => res.render('componente1'));
app.get('/componente2', (req, res) => res.render('componente2'));

// Rotas dos usuários
app.get('/usuarios', (req, res) => res.render('usuarios/listar', { usuarios }));
app.get('/usuarios/add', (req, res) => res.render('usuarios/adicionar'));

app.post('/usuarios/add', (req, res) => {
    const novo = {
        id: Date.now(),
        nome: req.body.nome,
        email: req.body.email
    };
    usuarios.push(novo);
    res.redirect('/usuarios');
});

app.get('/usuarios/edit/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    res.render('usuarios/editar', { usuario });
});

app.post('/usuarios/edit/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    res.redirect('/usuarios');
});

app.post('/usuarios/delete/:id', (req, res) => {
    usuarios = usuarios.filter(u => u.id != req.params.id);
    res.redirect('/usuarios');
});

// Exporta a app como função serverless
module.exports = app;
