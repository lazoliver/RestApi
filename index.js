const express = require('express'); // Importando Express
const bodyParse = require('body-parser') // Middleware para realizar um parser no corpo da requisição

const userRoute = require('./routes/userRoutes'); // Importando o arquivo de rotas

const app = express(); // Instanciando express

app.use(bodyParse.urlencoded({ extended: false }))
const port = 3000; // Porta 

userRoute(app);

app.get('/', (req, res) => res.send("Olá mundo pelo express!")); // Endpoint

app.listen(port, () => console.log("Server is running on port 3000!")); // Chegar a execução do node
