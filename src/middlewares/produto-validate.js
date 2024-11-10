const ProdutoValidate = (req,res,next) => {
    const {nome, marca, modelo} = req.body;


    if(!nome || typeof nome != 'string'){
        return res.status(400).json({
            msg : "Nome invalido"
        })
    }

    if(!marca || typeof marca != 'string'){
        return res.status(400).json({
            msg : "Marca invalida"
        })
    }

    if(!modelo || typeof modelo != 'string'){
        return res.status(400).json({
            msg : "Modelo invalido"
        })
    }


    const data = {
        nome : nome,
        marca : marca,
        modelo : modelo
    }

    req.produto = data;
    return next();
}


const ProdutoValidateId = (req,res,next) => {
    const {id} = req.params;

    if (!id || typeof id != "string") {
        return res.status(400).json({
          msg: "Valide seus parametros",
        });
      }
    
      // Validando se o id enviado esta correto, pos o id do mongodb e composto por 24 caracteres
      if (id.length > 24 || id.length < 24) {
        return res.status(400).json({
          msg: "Valide seus parametros",
        });
      }
    
      return next();
}

module.exports = {ProdutoValidate, ProdutoValidateId};