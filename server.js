const express = require('express')
var bodyParser = require("body-parser")
const app = express()
const PORT = 3001

// Iniciar Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota Principal
app.get('/', (req, res) => res.send('tasken-api rota principal'))

// Rota Produtos (subrotas pedidas dentro de './routes/api/produtos.js')
app.use('/produtos', require('./routes/api/produtos'))

app.listen(PORT, () => { console.log(`App rodando na porta ${PORT}`) })
