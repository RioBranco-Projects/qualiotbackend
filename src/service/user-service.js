const User = require("../models/User");
const jwt = require('jsonwebtoken');


const UserService = {
  create: async (data) => {
    try {
      const existeEmail = await User.findOne({ email: data.email });
      console.log(existeEmail);

      if (existeEmail) {
        return null;
      }

      return await User.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id) => {
    try {
      const user = await User.findById(id);

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, data) => {
    try {
      // Validando se ja existe esse email
      const existeEmail = await User.findOne({ email: data.email });
      if (existeEmail) {
        return {
          error: true,
          msg: "Email ja cadastrado",
        };
      }

      const user = await User.findById(id);
      if (!user) {
        return null;
      }

      return await user.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id) => {
    try {
      const user = await User.findById(id);

      if (!user) {
        return null;
      }

      return await user.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  login : async (data) => {
    try {

      const user = await User.findOne({
        email : data.email,
        password : data.password
      })

      if(!user){
        return null
      }

      const token = await jwt.sign({
        email : user.email,
        _id : user._id
      }, process.env.SECRET, {expiresIn : '1h'});

      return {
        token,
        nome : user.nome
      }


    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  }
};

module.exports = UserService;
