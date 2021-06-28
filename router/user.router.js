const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.isUserValid, userController.createUser);
router.get('/:userId', userMiddleware.checkUserPresent, userMiddleware.isThisIdInDB, userController.getUserById);
router.delete('/:userId', userMiddleware.isThisIdInDB, userController.deleteUserById);
module.exports = router;
