import { UserController } from './user/user.controller';
const fs = require('fs');

let fileNames = fs.readdirSync(`${__dirname}`);
fileNames = fileNames.filter((fileName) => {
    return fileName !== 'index.js';
});

/**
 * Scan the "modules" directory and make an array of each found module's main file (index.js)
 * @param dirs all available folder (module) names
 * @returns {Promise<void>}
 */
const importCreator = async (dirs) => {
    const temp = {};
    dirs.forEach(async (dir) => {
        temp[`${dir}`] = await require(`./${dir}`).default;
    });

    return temp;
};

/**
 * Find and create endpoints of all available modules in the "modules "folder"
 * @param router
 * @returns {Promise<void>}
 */
export default async (router) => {
    const imports = await importCreator(fileNames);

    const modules = Object.keys(imports).map((key) => {
        return (imports[key] = new imports[key](router));
    });

    modules.forEach((module) => module.createEndpoints());

    // Check if SA exist, if not create the super admin user
    let userData = {
        email: 'admin@gmail.com',
        password: 'P@ssw0rd',
        name: 'Admin'
    };

    await UserController.createDefaultSA(userData);
};
