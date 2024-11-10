const Produto = require("../models/Produto");

const ProdutoService = {
  create: async (data, idUsuario) => {
    try {
      data.userId = idUsuario;

      const produto = await Produto.create(data);
      return produto;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getAll: async (idUsuario) => {
    try {
      const produtos = await Produto.find({ userId: idUsuario });

      return produtos;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  getOne: async (id, idUsuario) => {
    try {
      const produto = await Produto.findOne({ _id: id, userId: idUsuario });

      if (!produto) {
        return null;
      }

      return produto;
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  update: async (id, idUsuario, data) => {
    try {
      const produto = await Produto.findOne({ _id: id, userId: idUsuario });

      if (!produto) {
        return null;
      }

      return await produto.updateOne(data);
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
  delete: async (id, idUsuario) => {
    try {
      const produto = await Produto.findOne({ _id: id, userId: idUsuario });

      if (!produto) {
        return null;
      }

      return await produto.deleteOne();
    } catch (error) {
      console.error(error);
      throw new Error("Erro, contate o suporte");
    }
  },
};

module.exports = ProdutoService;
