require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async() => {
    try {
        const url = "mongodb+srv://vitor:wCo2y4cElZZ9nVSC@qualiot.tjzad.mongodb.net/?retryWrites=true&w=majority&appName=qualiot"

        await mongoose.connect(url);

        console.log("db conectado")
    } catch (error) {
        console.error(error);
    }
}

module.exports = dbconnect;