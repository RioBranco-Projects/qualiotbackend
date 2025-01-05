const User = require("../models/User");
const jwt = require("jsonwebtoken");

const UserService = {
  create: async (dataUser) => {
    try {
      // Validar se existe ja o email
      const existEmail = await User.findOne({ email: dataUser.email });
      if (existEmail) {
        return {
          code: 400,
          error: {
            message: "Email already exists",
          },
        };
      }

      // Criando o usuario
      const user = await User.create(dataUser);

      // Criando o token de login
      const token = await jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: "5h" }
      );

      return {
        code: 201,
        message: "User created",
        user: user,
        token: token,
      };

      // return await User.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async () => {
    try {
      const users = await User.find();

      return {
        code: 200,
        message: "Users finded",
        user: users,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (id) => {
    try {
      const user = await User.findById(id);

      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }

      return {
        code: 200,
        message: "User finded",
        user: user,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (id, dataUser) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }
      // Validar se existe ja o email
      const existEmail = await User.findOne({ email: dataUser.email });
      if (existEmail) {
        return {
          code: 400,
          error: {
            message: "Email already exists",
          },
        };
      }

      await user.updateOne(dataUser);

      return {
        code: 200,
        message: "User update",
        user: user,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }

      await user.deleteOne();

      return {
        code: 200,
        message: "User deleted",
        user: user,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  login: async (data) => {
    try {
      const user = await User.findOne({
        email: data.email,
        password: data.password,
      });

      if (!user) {
        return null;
      }

      const token = await jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.SECRET,
        { expiresIn: "5h" }
      );

      return {
        token,
        nome: user.nome,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = UserService;
