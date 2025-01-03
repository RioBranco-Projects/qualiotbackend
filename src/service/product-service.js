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
          Objeto: [
            {
              title: "Identificação única",
              announced:
                "Qual é o identificador único do objeto IoT (por exemplo, número de série ou ID de dispositivo) e como ele é gerado e gerenciado?",
            },
            {
              title: "Capacidade de Atualização",
              annouced:
                "O objeto IoT pode receber atualizações de firmware/software? Como o processo de atualização é gerenciado e seguro?",
            },
            {
              title: "Consumo de Energia",
              annouced:
                "Quais são as expectativas de consumo de energia e vida útil da bateria do objeto IoT? Existem modos de economia de energia?",
            },
          ],
          Sensores: [
            {
              title: "Tipos de sensores",
              announced:
                "Quais tipos de sensores são utilizados e para quais finalidades específicas?",
            },
            {
              title: "Precisão e Calibração",
              announced:
                "Qual é a precisão necessária dos sensores e como a calibração é realizada e mantida?",
            },
            {
              title: "Resiliência Ambiental",
              announced:
                "Como os sensores lidam com variações ambientais como temperatura, umidade e interferências?",
            },
          ],
          Transmissao: [
            {
              title: "Protocolos de Comunicação",
              announced:
                "Quais protocolos de comunicação são suportados (por exemplo, MQTT, CoAP, HTTP, etc.) e por quê?",
            },
            {
              title: "Gerenciamento de Banda",
              announced:
                "Como será gerenciado o uso da banda de rede, especialmente em ambientes com recursos limitados? Existem mecanismos de adaptação à variação da banda?",
            },
            {
              title: "Estratégias de Retransmissão",
              announced:
                "Existem mecanismos para garantir a entrega de dados em caso de falhas de transmissão?",
            },
          ],
          Cloud: [
            {
              title: "Escalabilidade",
              announced:
                "Como a solução em nuvem lida com o aumento do número de dispositivos e do volume de dados?",
            },
            {
              title: "Recuperação de Desastres",
              announced:
                "Quais são os planos de recuperação de desastres e continuidade de negócios?",
            },
            {
              title: "Qualidade dos Dados",
              announced:
                "Como será garantida a qualidade dos dados armazenados? Quais os mecanismos de validação e limpeza dos dados?",
            },
          ],
          Seguranca: [
            {
              title: "Privacidade e Proteção de Dados",
              announced:
                "Quais medidas são adotadas para garantir a coleta, o armazenamento e o uso seguros e transparentes dos dados pessoais dos usuários, incluindo o consentimento informado e o cumprimento dos direitos dos titulares dos dados?",
            },
            {
              title: "Segurança da Informação",
              announced:
                "Como o sistema protege as informações dos usuários contra acessos não autorizados, ataques cibernéticos e perda de dados, garantindo a confidencialidade, integridade e disponibilidade das informações?",
            },
            {
              title: "Gerenciamento de Acesso e Auditoria",
              announced:
                "Como o sistema controla o acesso às informações, atribui permissões aos usuários e garante a rastreabilidade das ações realizadas no sistema, visando a segurança e a conformidade?",
            },
          ],
          Analise: [
            {
              title: "Processamento de Dados",
              announced:
                "Como os dados são processados e analisados? Existem capacidades de processamento de borda (edge computing)?",
            },
            {
              title: "Insights Acionáveis",
              announced:
                "Como os insights são extraídos dos dados e como eles podem ser utilizados para a tomada de decisões?",
            },
            {
              title: "Visualização de Dados",
              announced:
                "Quais ferramentas de visualização são utilizadas para representar os dados de forma compreensível para os usuários finais?",
            },
          ],
          Uso: [
            {
              title: "Experiência do Usuário",
              announced:
                "O sistema oferece uma experiência intuitiva, consistente e personalizada, guiando o usuário de forma clara e eficiente desde o início da interação?",
            },
            {
              title: "Acessibilidade",
              announced:
                "O sistema é acessível a todos os usuários, independentemente de suas habilidades ou deficiências, garantindo igualdade de acesso e uso?",
            },
            {
              title: "Usabilidade",
              announced:
                "O sistema é fácil de aprender, usar e eficiente para realizar as tarefas desejadas, minimizando erros e maximizando a satisfação do usuário?",
            },
          ],
        },
      ];

      for (const category of categorys) {
        const categoryCreated = await Category.create({
          _idProduct: product._id,
          name: category,
        });

        // Criar a questao
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

      const products = await Product.find({
        _idUser: idUsuario,
      });

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
      const product = await Product.findOne({
        _id: id,
        _idUser: idUsuario,
      });
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
      const product = await Product.findOne({
        _id: id,
        _idUser: idUsuario,
      });

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
      const product = await Product.findOne({
        _id: id,
        _idUser: idUsuario,
      });

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
