require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const database = require('./config/database');
const router = require('./routes/router');

app.use(express.json());
app.use('/', router);





app.listen(PORT, async() => {
    try {
        await database();
        // console.log("database conenctado");
    } catch (error) {
        console.error(error);
    }
    console.log("--------------------------------------------------");
    console.log("servidor no ar");
    console.log("--------------------------------------------------");
    
})

