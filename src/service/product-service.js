const Category = require("../models/Category");
const JustificationQuestion = require("../models/JustificationQuestion");
const Product = require("../models/Product");
const QuestionCategory = require("../models/QuestionCategory");
const User = require("../models/User");
const { isMongoID } = require("../utils/ValidationsUtils");
const CategoryService = require("./category-service");

const ProductService = {
  create: async (data, idUsuario) => {
    try {
      data._idUser = idUsuario;

      const product = await Product.create(data);

      const questions = [
        {
          category: "Objeto",
          questions: [
            {
              title: "Identificação única",
              announced:
                "Qual é o identificador único do objeto IoT (por exemplo, número de série ou ID de dispositivo) e como ele é gerado e gerenciado?",
            },
            {
              title: "Capacidade de Atualização",
              announced:
                "O objeto IoT pode receber atualizações de firmware/software? Como o processo de atualização é gerenciado e seguro?",
            },
            {
              title: "Consumo de Energia",
              announced:
                "Quais são as expectativas de consumo de energia e vida útil da bateria do objeto IoT? Existem modos de economia de energia?",
            },
          ],
        },
        {
          category: "Sensores",
          questions: [
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
        },
        {
          category: "Transmissão",
          questions: [
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
        },
        {
          category: "Cloud",
          questions: [
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
        },
        {
          category: "Segurança",
          questions: [
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
        },
        {
          category: "Análise",
          questions: [
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
        },
        {
          category: "Uso",
          questions: [
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

      // Percorrendo o array das questões
      for (const category of questions) {
        // Criando a categoria com base no array
        const categoryCreated = await Category.create({
          _idProduct: product._id,
          name: category.category,
          finalGrade: 0,
        });

        // Percorrendo o array das questões
        for (const questions of category.questions) {
          // Criando as questões de cada categoria
          await QuestionCategory.create({
            title: questions.title,
            announced: questions.announced,
            _idCategory: categoryCreated._id,
            grade: 0,
          });
        }
      }
      return {
        code: 201,
        message: "Product,categorys and questions created",
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
  updateFinalGrade: async (_idProduct) => {
    try {
      // Validando se foi enviado o id da categoria
      if (!_idProduct) {
        return {
          code: 400,
          error: {
            message: "The _idProduct is required",
          },
        };
      }

      // Validar se e um idMongo
      const isIdValid = await isMongoID(_idProduct.toString());
      if (isIdValid.error) {
        return {
          code: 400,
          error: {
            message: "The id sent is not a mongoId",
          },
        };
      }

      // Validar se o produto existe
      const product = await Product.findById(_idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      // Pegar a nota de todas as categorias
      const allCategorys = await CategoryService.getByProduct(_idProduct, true);

      // Variavel para manipular todas as notas da categoria
      var finalGradeCategorys = 0;

      for (const category of allCategorys.category) {
        // Se a nota não tiver definida, definir para 0
        if (category.finalGrade == null) {
          category.finalGrade = 0;
        }
        // Fazendo a soma para saber o total da nota
        finalGradeCategorys += category.finalGrade;
      }

      // Dividindo para o numero de categorias, para ter a media
      finalGradeCategorys /= allCategorys.category.length;

      // Calcular a proeficiencia
      let proficiency;
      const finalGrade = finalGradeCategorys.toFixed(2);
      if (finalGrade < 5) {
        proficiency = "Baixa";
      } else if (finalGrade > 8) {
        proficiency = "Alta";
      } else {
        proficiency = "Media";
      }

      // Atualizar a media da nota do produto
      await product.updateOne({
        finalGrade: finalGrade,
        proficiency: proficiency,
      });

      // Atualizar a proeficiencia

      return {
        code: 200,
        message: "Product finalGrade updated",
      };
      console.log(finalGradeCategorys.toFixed(2));
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getRelatorio: async (_idProduct) => {
    try {
      const product = await Product.findById(_idProduct);
      if (!product) {
        return {
          code: 404,
          error: {
            message: "Product not found",
          },
        };
      }

      // Pegando os dados do usuario
      const user = await User.findById(product._idUser);
      if (!user) {
        return {
          code: 404,
          error: {
            message: "user not found",
          },
        };
      }

      // Pegando todas as categorias
      const categorys = await Category.find({ _idProduct: product._id });
      const categorysDetails = [];
      for (const category of categorys) {
        // Pegando todas as questões da categoria
        const questions = await QuestionCategory.find({
          _idCategory: category._id,
        });

        const questionsDetails = [];

        // Percorrendo cada questão
        for (const question of questions) {
          const justification = await JustificationQuestion.find({
            _idQuestionCategory: question._id,
          });

          questionsDetails.push({
            title: question.title,
            announced: question.announced,
            grade: question.grade,
            justication: justification[0] || {},
          });
        }
        categorysDetails.push({
          name: category.name,
          finalGrade: category.finalGrade,
          questions: questionsDetails,
        });
      }

      console.log("category", categorysDetails);

      const relatorio = {
        name: product.name,
        description: product.description,
        finalGrade: product.finalGrade,
        proficiency: product.proficiency,
        user: user,
        categorys: categorysDetails,
      };

      return {
        code: 200,
        message: "Relatorio encontrado",
        relatorio,
      };

      /*
      {
        name,
        description,
        finalGrade,
        proficiency,
        dataUser,
        categorys : [
          {
          nameCategory,
          finalGrade,
          questions : [
            {
            title,
            announced,
            grade,
            justification : {
              justification
            }
            }
          ]
          }
        ]
      }



      */
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = ProductService;
