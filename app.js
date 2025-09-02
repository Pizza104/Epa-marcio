
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

 
let usuarios = [
    { id: 1, nome: "Kauã", email: "kaua@etec.gov.sp.br" },
    { id: 2, nome: "alguem  ", email: "alguem@etec.gov.sp.br" }
];

// Onde ficaria as Rotas principais
app.get('/', (req, res) => res.render('index'));
app.get('/integrantes', (req, res) => res.render('integrantes'));
app.get('/componente1', (req, res) => res.render('componente1'));
app.get('/componente2', (req, res) => res.render('componente2'));

// AS ROTAS DOS MEUS USUÁRIOS
app.get('/usuarios', (req, res) => {
    res.render('usuarios/listar', { usuarios });
});

app.get('/usuarios/add', (req, res) => {
    res.render('usuarios/adicionar');
});

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
