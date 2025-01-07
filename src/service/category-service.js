const Category = require("../models/Category");
const Produto = require("../models/Product");
const User = require("../models/User");

const CategoryService = {
  create: async (dataCategory, user) => {
    try {
      // Validar se o produto existe
      const product = await Produto.findById(dataCategory._idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      // Validar se o produto pertence a pessoa cadastrada
      const productIsYour = await Produto.find({
        _id: dataCategory._idProduct,
        _idUser: user._id,
      });

      if (!productIsYour) {
        return {
          code: 400,
          error: {
            message: "The product not belongs you",
          },
        };
      }

      // Validar se existe uma categoria com esse nome
      const existsCategoryName = await Category.findOne({
        _idProduct: dataCategory._idProduct,
        name: dataCategory.name,
      });
      if (existsCategoryName) {
        return {
          code: 404,
          error: {
            message: "Name already created",
          },
        };
      }

      // Validar se tem o limite de categorias ja foi excedido
      const limitCategory = 10;

      const countCategory = await Category.countDocuments({
        _idProduct: product._id,
      });

      if (countCategory >= limitCategory) {
        return {
          code: 400,
          error: {
            message: "category limit exceeded",
          },
        };
      }

      const category = await Category.create(dataCategory);

      return {
        code: 201,
        message: "Category created",
        category: category,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (_idCategory, query) => {
    try {
      const { details = false } = query;
      const category = await Category.findById({ _id: _idCategory });
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }

      if (details !== "true") {
        return {
          code: 200,
          message: "Categorys finded",
          category: category,
        };
      }

      const product = await Produto.findById(category._idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      const user = await User.findById(product._idUser);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }

      const categoryDetail = {
        _id: category._id,
        name: category.name,
        product: {
          _id: product._id,
          name: product.name,
          finalGrade: product.finalGrade,
          description: product.description,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      };

      return {
        code: 200,
        message: "Categorys finded",
        category: categoryDetail,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (dataUpdate, user) => {
    try {
      // Validar se existe a categoria enviada
      const category = await Category.findById(dataUpdate._id);
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }

      // Validar se enviaram o idProduct, validar se existe o produto
      if (dataUpdate._idProduct) {
        const product = await Produto.findById({ _id: dataUpdate._idProduct });

        if (!product) {
          return {
            code: 404,
            error: {
              message: "Product not found",
            },
          };
        }

        if (product._idUser !== user._id) {
          return {
            code: 400,
            error: {
              message: "The product not belongs you",
            },
          };
        }

        // Validar se as categorias do produto ja excederam o limite maximo

        // Validar se tem o limite de categorias ja foi excedido
        const limitCategory = 10;

        const countCategory = await Category.countDocuments({
          _idProduct: product._id,
        });

        if (countCategory >= limitCategory) {
          return {
            code: 400,
            error: {
              message: "category limit exceeded",
            },
          };
        }
        if (dataUpdate.name) {
          const existsThisName = await Category.findOne({
            _idProduct: product._id,
            name: dataUpdate.name,
          });

          console.log(existsThisName);

          if (existsThisName) {
            return {
              code: 404,
              error: {
                message: "Name already created",
              },
            };
          }
        }
      }

      await category.updateOne({
        name: dataUpdate.name,
        _idProduct: dataUpdate._idProduct,
      });

      return {
        code: 200,
        message: "Category updated",
        category: category,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (_idCategory, user) => {
    try {
      // Validando se existe a categoria
      const category = await Category.findById(_idCategory);
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }

      // Validando se existe o produto
      const product = await Produto.findById(category._idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      // Validando se o id do produto a ser deletado, pertence ao token da pessoa
      if (product._idUser !== user._id) {
        return {
          code: 401,
          error: {
            message: "The product not belongs your",
          },
        };
      }

      // Deletando a categoria
      await category.deleteOne();

      // Atualizar a nota final do produto
      const ProductService = require("./product-service");

      // Atualizar a nota do produto
      const updateFinalGrade = await ProductService.updateFinalGrade(
        category._idProduct
      );

      if (updateFinalGrade.error) {
        return updateFinalGrade;
      }

      return {
        code: 200,
        message: "Category deleted",
        category: category,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByProduct: async (_idProduct, query) => {
    try {
      const { details = false } = query;
      const product = await Produto.findById(_idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      const categorys = await Category.find({ _idProduct: _idProduct });
      if (details !== "true") {
        return {
          code: 200,
          message: "Category finded",
          category: categorys,
        };
      }

      const categorysDetails = [];
      const user = await User.findById(product._idUser);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "User not found",
          },
        };
      }
      for (const category of categorys) {
        const categoryDetail = {
          _id: category._id,
          name: category.name,
          product: {
            _id: product._id,
            name: product.name,
            finalGrade: product.finalGrade,
            description: product.description,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
          },
        };

        categorysDetails.push(categoryDetail);
      }

      return {
        code: 200,
        message: "Category finded",
        category: categorysDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = CategoryService;
