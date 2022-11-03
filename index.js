const express = require ('express')
const cors = require('cors')
const app = express() 
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

const Noticia = mongoose.model("Noticia", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String},
}))

async function conectarAoMongoDB() {
    await
    mongoose.connect(
        `mongodb+srv://PinkFlag-admin:admin@cluster0.get5jch.mongodb.net/?retryWrites=true&w=majority`
    )
}

app.get("/noticias", async (req, res) =>{
    const noticias = await Noticia.find()
    res.json(noticias)
})

app.post("/noticias", async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const imagem = req.body.imagem
    const noticia = new Noticia({titulo: titulo, sinopse: sinopse})
    await noticia.save()
    const noticias = await Noticia.find()
    res.json(noticias)
})

app.get('/news', (req, res) => { res.send('news')
})


app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("up & running")
    } catch (e) {
        console.log('Erro', e)
    }
})