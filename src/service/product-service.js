const Category = require("../models/Category");
const Product = require("../models/Product");

const ProductService = {
  create: async (data, idUsuario) => {
    try {
      data._idUser = idUsuario;

      const product = await Product.create(data);
      const categorys = [
        "Objeto",
        "Sensores",
        "Transmissão",
        "Cloud",
        "Segurança",
        "Análise",
        "Uso",
      ];

      for (const category of categorys) {
        await Category.create({ _idProduct: product._id, name: category });
      }
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
      const product = await Product.find({ _idUser: idUsuario });

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
      const product = await Product.findOne({ _id: id, _idUser: idUsuario });

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
      const product = await Product.findOne({ _id: id, _idUser: idUsuario });

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
      const product = await Product.findOne({ _id: id, _idUser: idUsuario });

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

module.exports = ProductService;
