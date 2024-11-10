const {Router} = require('express');
const router = Router();
const UserRouter = require('./user-router');
const ProdutoRouter = require('./produto-router');

router.use('/user', UserRouter);
router.use('/produto', ProdutoRouter);

module.exports = router