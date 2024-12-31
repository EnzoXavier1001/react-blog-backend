const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Conectado ao banco de dados com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
}

module.exports = connect;
