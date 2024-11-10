const {Router} = require('express');
const TokenAuthenticate = require('../middlewares/token-authenticate');
const ProdutoController = require('../controllers/produto-controller');
const { ProdutoValidate, ProdutoValidateId } = require('../middlewares/produto-validate');
const router = Router();


// Create produto
router.post('/', TokenAuthenticate, ProdutoValidate, ProdutoController.create);

// GetAll produto
router.get('/', TokenAuthenticate, ProdutoController.getAll);

// GetOne produto
router.get('/:id', TokenAuthenticate, ProdutoValidateId, ProdutoController.getOne);

// Update produto
router.put('/:id', TokenAuthenticate, ProdutoValidateId, ProdutoController.update);

// Delete produto
router.delete('/:id', TokenAuthenticate, ProdutoValidateId, ProdutoController.delete);


module.exports = router;