const UserService = require("../service/user-service");

const UserController = {
    create : async(req,res) => {
        try {
            const data = req.user;            

            const user = await UserService.create(data);

            if(!user){
                return res.status(401).json({
                    msg : "Email ja cadastrado"
                })
            }

            return res.status(200).json({
                msg : "usuario cadastrado",
                user
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    },
    getAll : async(req,res) => {
        try {
            
            const users = await UserService.getAll();

            return res.status(200).json({
                msg : "Todos os usuarios",
                users
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    },
    getOne : async(req,res) => {
        try {
            const {id} = req.params;

            const user = await UserService.getOne(id);

            if(!user){
                return res.status(404).json({
                    msg : "Usuario não encontrado"
                })
            }


            return res.status(200).json({
                msg : "Usuario encontrado",
                user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    },
    update : async(req,res) => {
        try {
            const {nome,email,password} = req.body;
            const {id} = req.params;
            const data = {
                nome : nome,
                email : email,
                password : password
            }

            const user = await UserService.update(id, data);

            if(user.error){
                return res.status(401).json({
                    msg : user.msg
                })
            }

            if(!user){
                return res.status(404).json({
                    msg : "Usuario não encontrado"
                })
            }

            return res.status(200).json({
                msg : "Usuario atualizado com sucesso",
                user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    },
    delete : async(req,res) => {
        try {
            const {id} = req.params
            
            const user = await UserService.delete(id);

            if(!user){
                return res.status(404).json({
                    msg : "Usuario não encontrado"
                })
            }

            return res.status(200).json({
                msg : "Usuario deletado com sucesso",
                user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    },
    login : async (req,res) => {
        try {
            

            const data = {
                email : req.body.email,
                password : req.body.password
            }

            const userLogin = await UserService.login(data);

            if(!userLogin){
                return res.status(401).json({
                    msg : "Não cadastrado"
                })
            }

            return res.status(200).json({
                msg : "Login feito com sucesso",
                userLogin
            })


        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg : 'Erro, contate o suporte'
            })
        }
    }
}


module.exports = UserController;