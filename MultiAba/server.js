const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Página Inicial',
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { 
        pageTitle: 'Sobre a Aplicação',
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', { 
        pageTitle: 'Entre em Contato',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
