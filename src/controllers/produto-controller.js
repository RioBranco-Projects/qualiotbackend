const ProdutoService = require("../service/produto-service");

const ProdutoController = {
  create: async (req, res) => {
    try {
      const produto = await ProdutoService.create(req.produto, req.user._id);
      return res.status(200).json({
        msg: "Produto criado com sucesso !",
        produto,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const produtos = await ProdutoService.getAll(req.user._id);

      return res.status(200).json({
        msg: "Todos os produtos",
        produtos,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const produto = await ProdutoService.getOne(req.params.id, req.user._id);

      if (!produto) {
        return res.status(404).json({
          msg: "Produto não encontrado",
        });
      }
      return res.status(200).json({
        msg: "Produto encontrado",
        produto,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  update: async (req, res) => {
    try {
      const data = {
        nome: req.body.nome,
        marca: req.body.marca,
        modelo: req.body.modelo,
      };

      const produto = await ProdutoService.update(
        req.params.id,
        req.user._id,
        data
      );

      if (!produto) {
        return res.status(404).json({
          msg: "Produto não encontrado",
        });
      }

      return res.status(200).json({
        msg: "Produto atualizado com sucesso",
        produto,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const produto = await ProdutoService.delete(req.params.id, req.user._id);

      if (!produto) {
        return res.status(404).json({
          msg: "Produto não encontrado",
        });
      }

      return res.status(200).json({
        msg: "Produto deletado com sucesso",
        produto,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro, contate o suporte",
      });
    }
  },
};

module.exports = ProdutoController;
