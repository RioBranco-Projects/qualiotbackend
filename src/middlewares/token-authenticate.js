const jwt = require('jsonwebtoken');

const TokenAuthenticate = (req,res,next) => {

    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            msg : "login não autorizado"
        })
    }

    jwt.verify(token, process.env.SECRET, (err,user) => {
        if(err){
            return res.status(401).json({
                msg : "Acesso negado"
            })
        }

        req.user = user;
        return next();
    })

    
}


module.exports = TokenAuthenticate