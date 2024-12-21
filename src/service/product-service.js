const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");

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

      const questions = [
        {
          title: "Identificação única",
          announced:
            "Qual é o identificador único do objeto IoT (por exemplo, número de série ou ID de dispositivo) e como ele é gerado e gerenciado?",
        },
      ];

      for (const category of categorys) {
        const categoryCreated = await Category.create({
          _idProduct: product._id,
          name: category,
        });
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
  getAll: async (idUsuario, query) => {
    try {
      const { details = false } = query;

      const products = await Product.find({ _idUser: idUsuario });

      if (details !== "true") {
        return {
          code: 200,
          message: "Products finded",
          product: products,
        };
      }
      const productsDetails = [];

      for (const product of products) {
        const user = await User.findById(product._idUser);
        if (!user) {
          return {
            code: 404,
            error: {
              message: "User not found",
            },
          };
        }

        const productDetail = {
          _id: product._id,
          name: product.name,
          finalGrade: product.finalGrade,
          description: product.description,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        };

        productsDetails.push(productDetail);
      }
      return {
        code: 200,
        message: "Products finded",
        product: productsDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (id, idUsuario, query) => {
    try {
      const { details = false } = query;
      const product = await Product.findOne({ _id: id, _idUser: idUsuario });
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }
      if (details !== "true") {
        return {
          code: 200,
          message: "Product finded",
          product: product,
        };
      }

      const user = await User.findById(idUsuario);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }

      const productDetail = {
        _id: product._id,
        name: product.name,
        finalGrade: product.finalGrade,
        description: product.description,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      };

      return {
        code: 200,
        message: "Product finded",
        product: productDetail,
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
