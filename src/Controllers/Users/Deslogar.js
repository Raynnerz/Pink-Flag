async function Deslogar(res) {
    // LIMPA OS COOKIES DO NAVEGADOR.
    res.clearCookie('Token');
    res.redirect('/');
}

module.exports = Deslogar;