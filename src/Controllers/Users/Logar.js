const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../../Schemas/User');

async function Logar(body){
    // RECEBE OS DADOS DO USUÁRIO.
    const email = body.email;
    const senha = body.senha;

    // VERIFICA OS DADOS.
    if (!email || !senha) {
        return { erro: 'Dados insuficientes.'}
    }

    // BUSCA O USUÁRIO NO BANCO. 
    Find = await User.find({ email, senha })
        .then(response => {
            return response;
        }).catch(erro => {
            return { erro: erro }
        });

    // VERIFICA SE ENCONTROU.
    if (Find == '' || Find.erro) {
        return { erro: 'E-mail ou senha incorretos.' }
    }

    // SE ENCONTROU, GERA O TOKEN.
    Token = await jsonwebtoken.sign({
        id: Find[0]._id,
        nome: Find[0].nome,
        email: Find[0].email,
    }, 'SenhaParaProtegerOToken');

    // SALVA O TOKEN NOS COOKIES DO NAVEGADOR.
    res.cookie('Token', Token);
    res.sendStatus(200);
}

module.exports = Logar;