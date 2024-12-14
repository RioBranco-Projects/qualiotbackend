const ProdutoService = require("../service/produto-service");

const ProdutoController = {
  create: async (req, res) => {
    try {
      const product = await ProdutoService.create(req.product, req.user._id);

      if (product.error) {
        return res.status(product.code).json({
          code: product.code,
          message: "Error, while create product",
          details: {
            controller: "ProductController",
            cause: product.error.message,
          },
        });
      }

      return res.status(product.code).json({
        code: product.code,
        message: product.message,
        product: product.product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the product",
          details: {
            controller: "ProductController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const product = await ProdutoService.getAll(req.user._id);
      if (product.error) {
        return res.status(product.code).json({
          code: product.code,
          message: "Error, while getAll product",
          details: {
            controller: "ProductController",
            cause: product.error.message,
          },
        });
      }

      return res.status(product.code).json({
        code: product.code,
        message: product.message,
        product: product.product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getAll the product",
          details: {
            controller: "ProductController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const product = await ProdutoService.getOne(req.params.id, req.user._id);
      if (product.error) {
        return res.status(product.code).json({
          code: product.code,
          message: "Error, while getOne product",
          details: {
            controller: "ProductController",
            cause: product.error.message,
          },
        });
      }

      return res.status(product.code).json({
        code: product.code,
        message: product.message,
        product: product.product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while getOne the product",
          details: {
            controller: "ProductController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        description: req.body.description,
      };

      const product = await ProdutoService.update(
        req.params.id,
        req.user._id,
        data
      );

      if (product.error) {
        return res.status(product.code).json({
          code: product.code,
          message: "Error, while update product",
          details: {
            controller: "ProductController",
            cause: product.error.message,
          },
        });
      }

      return res.status(product.code).json({
        code: product.code,
        message: product.message,
        product: product.product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update the product",
          details: {
            controller: "ProductController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const product = await ProdutoService.delete(req.params.id, req.user._id);
      if (product.error) {
        return res.status(product.code).json({
          code: product.code,
          message: "Error, while delete product",
          details: {
            controller: "ProductController",
            cause: product.error.message,
          },
        });
      }

      return res.status(product.code).json({
        code: product.code,
        message: product.message,
        product: product.product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while delete the product",
          details: {
            controller: "ProductController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = ProdutoController;
