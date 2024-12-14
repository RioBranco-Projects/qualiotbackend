const UserService = require("../service/user-service");

const UserController = {
  create: async (req, res) => {
    try {
      const user = await UserService.create(req.user);

      if (user.error) {
        return res.status(user.code).json({
          code: user.code,
          message: "Error, while create user",
          details: {
            controller: "UserController",
            cause: user.error.message,
          },
        });
      }

      return res.status(user.code).json({
        code: user.code,
        message: user.message,
        user: user.user,
        token: user.token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the user",
          details: {
            controller: "UserController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await UserService.getAll(req.user);

      if (user.error) {
        return res.status(user.code).json({
          code: user.code,
          message: "Error, while getAll user",
          details: {
            controller: "UserController",
            cause: user.error.message,
          },
        });
      }

      return res.status(user.code).json({
        code: user.code,
        message: user.message,
        user: user.user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getAll the user",
          details: {
            controller: "UserController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await UserService.getOne(id);

      if (user.error) {
        return res.status(user.code).json({
          code: user.code,
          message: "Error, while getOne user",
          details: {
            controller: "UserController",
            cause: user.error.message,
          },
        });
      }

      return res.status(user.code).json({
        code: user.code,
        message: user.message,
        user: user.user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getOne the user",
          details: {
            controller: "UserController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const { nome, email, password } = req.body;
      const { id } = req.params;
      const data = {
        nome: nome,
        email: email,
        password: password,
      };

      const user = await UserService.update(id, data);

      if (user.error) {
        return res.status(user.code).json({
          code: user.code,
          message: "Error, while update user",
          details: {
            controller: "UserController",
            cause: user.error.message,
          },
        });
      }

      return res.status(user.code).json({
        code: user.code,
        message: user.message,
        user: user.user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update the user",
          details: {
            controller: "UserController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await UserService.delete(id);

      if (user.error) {
        return res.status(user.code).json({
          code: user.code,
          message: "Error, while delete user",
          details: {
            controller: "UserController",
            cause: user.error.message,
          },
        });
      }

      return res.status(user.code).json({
        code: user.code,
        message: user.message,
        user: user.user,
      });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: {
            code: 500,
            method: req.method,
            message: "Error, while delete the user",
            details: {
              controller: "UserController",
              cause: error.message,
            },
          },
        });
    }
  },
  login: async (req, res) => {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const userLogin = await UserService.login(data);

      if (!userLogin) {
        return res.status(401).json({
          msg: "Não cadastrado",
        });
      }

      return res.status(200).json({
        msg: "Login feito com sucesso",
        userLogin,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
};

module.exports = UserController;
