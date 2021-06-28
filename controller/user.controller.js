const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        const allUsers = await userService.getAllUsers();
        res.json(allUsers);
    },
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const userWithId = await userService.getUserById(userId);
            res.json(userWithId);
        } catch (e) {
            res.json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);
            res.json('User create');
        } catch (e) {
            res.json(e.message);
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            await userService.deleteUserById(userId);
            res.json('user delete');
        } catch (e) {
            res.json(e.message);
        }
    }
};
