require('dotenv').config();
const mongoose = require('mongoose');

const dbconnect = async() => {
    try {
        const HOST_DB = process.env.HOST_DB;
        const PASS_DB = process.env.PASS_DB;

        const url = `mongodb+srv://${HOST_DB}:${PASS_DB}@qualiotdb.6l0gn.mongodb.net/?retryWrites=true&w=majority&appName=qualiotdb`

        await mongoose.connect(url);

        console.log("db conectado")
    } catch (error) {
        console.error(error);
    }
}

module.exports = dbconnect;