const Produto = require("../models/Produto");

const ProdutoService = {
  create: async (data, idUsuario) => {
    try {
      data._idUser = idUsuario;

      const product = await Produto.create(data);
      return {
        code: 201,
        message: "Product created",
        product: product,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async (idUsuario) => {
    try {
      const product = await Produto.find({ _idUser: idUsuario });

      return {
        code: 200,
        message: "Products finded",
        product: product,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (id, idUsuario) => {
    try {
      const product = await Produto.findOne({ _id: id, _idUser: idUsuario });

      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      return {
        code: 200,
        message: "Product finded",
        product: product,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (id, idUsuario, data) => {
    try {
      const product = await Produto.findOne({ _id: id, _idUser: idUsuario });

      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      await product.updateOne(data);

      return {
        code: 200,
        message: "Product updated",
        product: product,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (id, idUsuario) => {
    try {
      const product = await Produto.findOne({ _id: id, _idUser: idUsuario });

      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }
      await product.deleteOne();
      return {
        code: 200,
        message: "Product deleted",
        product: product,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = ProdutoService;
