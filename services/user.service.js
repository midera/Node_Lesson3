const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pathDB = path.join(process.cwd(), 'dataBase', 'userdb.json');

module.exports = {
    getAllUsers: async () => {
        const allUsers = await readFile(pathDB);
        return JSON.parse(allUsers.toString());
    },
    getUserById: async (id) => {
        const data = await readFile(pathDB);
        const allUsers = JSON.parse(data.toString());
        return allUsers.filter((user) => +user.id === +id);
    },
    createUser: async (user) => {
        const data = await readFile(pathDB);
        const allUsers = JSON.parse(data.toString());
        user.id = allUsers.length + 1;
        allUsers.push(user);
        await writeFile(pathDB, JSON.stringify(allUsers));
    },
    deleteUserById: async (id) => {
        const data = await readFile(pathDB);
        const allUsers = JSON.parse(data.toString());
        const resultArrayUsers = allUsers.filter((user) => +user.id !== +id);
        await writeFile(pathDB, JSON.stringify(resultArrayUsers));
    }
};
