const userService = require('../services/user.service');
const { constant } = require('../constant');

module.exports = {
    checkUserPresent: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(constant.USER_IS_NOT_VALID);
            }
            next();
        } catch (err) {
            res.status(constant.BAD_REQUEST).json(err.message);
        }
    },
    isThisIdInDB: async (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const data = await userService.getUserById();
            const allUsers = JSON.parse(data.toString());
            const result = allUsers.some((user) => +user.id === userId);
            if (!result) {
                throw new Error(constant.NO_USER_WITH_THIS_ID);
            }
            next();
        } catch (err) {
            res.status(constant.BAD_REQUEST).json(err.message);
        }
    },
    isUserValid: async (req, res, next) => {
        try {
            const { name, password, email } = req.body;
            const data = await userService.getAllUsers();
            const allUsers = JSON.parse(data.toString());
            const result = allUsers.some((user) => user.email === req.body.email);
            if (result || name.length < 1 || name.length > 20 || Number.isInteger(name) || password.length < 5
                || email.length < 10 || email.length > 50 || !email.includes('@')) {
                throw new Error(constant.USER_IS_NOT_VALID);
            }
            next();
        } catch (err) {
            res.status(constant.BAD_REQUEST).json(err.message);
        }
    }
};
