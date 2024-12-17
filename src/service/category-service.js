const Category = require("../models/Category");
const Produto = require("../models/Product");

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
  getOne: async (_idCategory) => {
    try {
      const category = await Category.findById({ _id: _idCategory });
      if (!category) {
        return {
          code: 404,
          error: {
            message: "Category not found",
          },
        };
      }
      return {
        code: 200,
        message: "Categorys finded",
        category: category,
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
      }

      if (dataUpdate.name) {
        const existsThisName = await Category.findOne({
          _idProduct: category._idProduct,
          name: dataUpdate.name,
        });

        if (existsThisName) {
          return {
            code: 404,
            error: {
              message: "Name already created",
            },
          };
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

      const category = await Category.findById(_idCategory);
      if(!category){
        return {
          code : 404,
          error : {
            message : "Category not found"
          }
        }
      }

      const product = await Produto.findById(category._idProduct);
      if(!product){
        return {
          code : 404,
          error : {
            message : "Product not found"
          }
        }
      }

      if(product._idUser !== user._id){
        return {
          code : 401,
          error : {
            message : "The product not belongs your"
          }
        }
      }


      await category.deleteOne();


      return {
        code : 200,
        message : "Category deleted",
        category : category
      }


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
