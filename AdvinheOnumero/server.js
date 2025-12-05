const port = 8000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let numeroSecreto = gerarNumero();

function gerarNumero() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log("Número secreto gerado:", numeroSecreto);

app.get('/', (req, res) => {
    res.send(`
        <h1>Adivinhe o Número!</h1>
        <p>Digite um número entre 1 e 100:</p>

        <form action="/" method="POST">
            <input type="number" name="palpite" required>
            <button type="submit">Enviar</button>
        </form>

        <form action="/reset" method="POST">
            <button type="submit">Sortear número de novo</button>
        </form>
    `);
});

app.post('/', (req, res) => {
    const palpite = Number(req.body.palpite);
    let mensagem = "";

    if (palpite > numeroSecreto) {
        mensagem = `Seu palpite (${palpite}) é <strong>muito alto</strong>.`;
    } else if (palpite < numeroSecreto) {
        mensagem = `Seu palpite (${palpite}) é <strong>muito baixo</strong>.`;
    } else {
        mensagem = `<strong>Você acertou!! O número era ${numeroSecreto}</strong>`;
    }

    res.send(`
        <h1>Adivinhe o Número!</h1>
        <p>${mensagem}</p>

        <form action="/" method="POST">
            <input type="number" name="palpite" required>
            <button type="submit">Tentar novamente</button>
        </form>

        <form action="/reset" method="POST">
            <button type="submit">Sortear o número de novo</button>
        </form>
    `);
});

app.post('/reset', (req, res) => {
    numeroSecreto = gerarNumero();
    console.log("Novo número secreto:", numeroSecreto);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
