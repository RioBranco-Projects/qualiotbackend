const UserValidate = (req,res,next) => {
    const {nome, email, password} = req.body;

    if(!nome || typeof nome != 'string'){
        return res.status(400).json({
            msg : "Valide seus dados"
        })
    }

    if(!email || typeof email != 'string'){
        return res.status(400).json({
            msg : "Valide seus dados"
        })
    }

    if(!password || typeof password != 'string'){
        return res.status(400).json({
            msg : "Valide seus dados"
        })
    }

    const data = {
        nome : nome,
        email : email,
        password : password
    }
    
    req.user = data;
    return next();
}


const UserValidateId = (req,res,next) => {
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

module.exports = {UserValidate, UserValidateId};