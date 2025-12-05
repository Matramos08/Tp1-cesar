const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const numeroSecreto = Math.floor(Math.random() * 100) + 1;
console.log("Número secreto gerado:", numeroSecreto);

app.get('/', (req, res) => {
    res.send(`
        <h1>Adivinhe o Número!</h1>
        <p>Digite um número entre 1 e 100:</p>
        <form action="/" method="POST">
            <input type="number" name="palpite" required>
            <button type="submit">Enviar</button>
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
        mensagem = `<strong>Parabéns! Você acertou o número: ${numeroSecreto}</strong>`;
    }

    res.send(`
        <h1>Adivinhe o Número!</h1>
        <p>${mensagem}</p>

        <form action="/" method="POST">
            <input type="number" name="palpite" required>
            <button type="submit">Tentar novamente</button>
        </form>
    `);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
