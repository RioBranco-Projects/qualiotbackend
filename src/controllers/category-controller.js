const CategoryService = require("../service/category-service");

const CategoryController = {
  create: async (req, res) => {
    try {
      const category = await CategoryService.create(req.category, req.user);

      if (category.error) {
        return res.status(category.code).json({
          code: category.code,
          message: "Error, while create category",
          details: {
            controller: "CategoryController",
            cause: category.error.message,
          },
        });
      }

      return res.status(category.code).json({
        code: category.code,
        message: category.message,
        category: category.category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while crerate the category",
          details: {
            controller: "CategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const category = await CategoryService.getOne(req.params.id, req.query);

      if (category.error) {
        return res.status(category.code).json({
          code: category.code,
          message: "Error, while getOne category",
          details: {
            controller: "CategoryController",
            cause: category.error.message,
          },
        });
      }

      return res.status(category.code).json({
        code: category.code,
        message: category.message,
        category: category.category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getOne the category",
          details: {
            controller: "CategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const dataUpdate = {
        _id: req.params.id,
        name: req.body.name,
        _idProduct: req.body._idProduct,
      };

      const category = await CategoryService.update(dataUpdate, req.user);

      if (category.error) {
        return res.status(category.code).json({
          code: category.code,
          message: "Error, while update category",
          details: {
            controller: "CategoryController",
            cause: category.error.message,
          },
        });
      }

      return res.status(category.code).json({
        code: category.code,
        message: category.message,
        category: category.category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update the category",
          details: {
            controller: "CategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const category = await CategoryService.delete(req.params.id, req.user);

      if (category.error) {
        return res.status(category.code).json({
          code: category.code,
          message: "Error, while delete category",
          details: {
            controller: "CategoryController",
            cause: category.error.message,
          },
        });
      }

      return res.status(category.code).json({
        code: category.code,
        message: category.message,
        category: category.category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while delete the category",
          details: {
            controller: "CategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
  getByProduct: async (req, res) => {
    try {
      const category = await CategoryService.getByProduct(
        req.params.id,
        req.query
      );

      if (category.error) {
        return res.status(category.code).json({
          code: category.code,
          message: "Error, while getByProduct category",
          details: {
            controller: "CategoryController",
            cause: category.error.message,
          },
        });
      }

      return res.status(category.code).json({
        code: category.code,
        message: category.message,
        category: category.category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getByProduct the category",
          details: {
            controller: "CategoryController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = CategoryController;
