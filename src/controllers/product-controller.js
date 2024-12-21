const ProductService = require("../service/product-service");

const ProdutoController = {
  create: async (req, res) => {
    try {
      const product = await ProductService.create(req.product, req.user._id);

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
      const product = await ProductService.getAll(req.user._id, req.query);
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
      const product = await ProductService.getOne(
        req.params.id,
        req.user._id,
        req.query
      );
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

      const product = await ProductService.update(
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
      const product = await ProductService.delete(req.params.id, req.user._id);
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
