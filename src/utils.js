const fs = require("fs");
const Path = require('path');
const fetch = require('node-fetch');

const existPath = (ruta) => fs.existsSync(ruta);

const isAbsolute = (ruta) => Path.isAbsolute(ruta);

const getAbsolute = (ruta) => Path.resolve(ruta);

const isFolder = (ruta) => fs.statSync(ruta).isDirectory();

const getFileExtension = (ruta) => Path.extname(ruta)

const getData = (path) => {
    if (getFileExtension(path) !== '.md') {
        return 'No es un archivo md'
    }
    const fileData = fs.readFileSync(path, 'utf8');
    const allLinks = getLinks(fileData, path)
    return allLinks;
}

const getLinks = (file, path) => {
    const regExp = /(\[(.*?)\])?\(h(.*?)\)/gm;
    const arrayMatchReg = file.match(regExp);
    const arrayObjectsLinks = arrayMatchReg.map((item) => {
        const objLink = {
            text: item.slice(1, item.indexOf(']')),
            href: item.slice(item.indexOf('(') + 1, item.indexOf(')')),
            path,
        }
        return objLink;
    })
    return arrayObjectsLinks;
}
// Opciones validate
const validate = (objts) => {
    const val = objts.map((elem) => {
        const statusData = fetch(elem.href).then((Response) => {
            if (Response.status < 400) {
                return {
                    ...elem,
                    status: Response.status,
                    statusText: Response.statusText
                };
            }
            return {
                ...element,
                status: res.status,
                statusText: 'FAIL',
            };
        }).catch(error => ({
            ...elem,
            status: 'ERROR',
            statusText: 'FAIL',
        }));
        return statusData;
    });
    return Promise.all(val);
};
// Opcion stats
const stats = (objts) => {
    const uniqueData = new Set(objts);
    let uniqueArray = [...uniqueData];

    return ({
        total: objts.length,
        unique: uniqueArray.length,
    })
}

// Leer directorios y revisar dentro de forma recursiva
const readFolder = (path) => {
    let paths = [];
    const fileList = fs.readdirSync(path);
    fileList.forEach((file) => {
        rutaAll = Path.join(path, file);
        if (isFolder(rutaAll)) {
            const paths2 = readFolder(rutaAll)
            paths = paths.concat(paths2)
        }
        else if (getFileExtension(rutaAll) === '.md') {
            paths.push(rutaAll)
        }
    })
    return paths
}
module.exports = {
    getData,
    existPath,
    isAbsolute,
    getAbsolute,
    isFolder,
    getFileExtension,
    getLinks,
    validate,
    stats,
    readFolder,
};