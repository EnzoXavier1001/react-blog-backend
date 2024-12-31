const express = require("express")
const connect = require("./config/connection")
const router = require("./routes")

const app = express();

app.use(express.json());
app.use(router)

const PORT = 8080;

connect().then(() => {
    app.listen(PORT, () => {
        console.log('Servidor está rodando na porta ' + PORT);
    });
}).catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
});