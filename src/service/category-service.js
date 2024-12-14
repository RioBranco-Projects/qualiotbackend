const Category = require("../models/Category");
const Produto = require("../models/Product");

const CategoryService = {
  create: async (dataCategory) => {
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

      // Validar se existe uma categoria com esse nome
      const existsCategoryName = await Category.findOne({
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
  getAll: async (dataCategory) => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (dataCategory) => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (dataCategory) => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (dataCategory) => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByProduct: async (_idProduct) => {
    try {
      const product = await Produto.findById(_idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      const category = await Category.find({ _idProduct: _idProduct });

      return {
        code: 200,
        message: "Category finded",
        category: category,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = CategoryService;
