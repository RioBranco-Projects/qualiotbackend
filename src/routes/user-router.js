const {Router} = require('express');
const UserController = require('../controllers/user-controller');
const { UserValidate, UserValidateId } = require('../middlewares/user-validate');
const router = Router();



// Create user
router.post('/', UserValidate, UserController.create);


// getAll user
router.get('/', UserController.getAll);


// getOne user
router.get('/:id', UserValidateId, UserController.getOne);


// update user
router.put('/:id', UserValidateId, UserController.update);


// delete user
router.delete('/:id', UserValidateId, UserController.delete);

// login user

router.post('/login', UserController.login);



module.exports = router;