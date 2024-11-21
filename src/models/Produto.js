const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome : {
        type : String,
        required : true,
    },
    marca : {
        type : String,
        required : true,
    },
    modelo : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
    }
})

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;