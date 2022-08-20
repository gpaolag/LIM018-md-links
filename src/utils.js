const fs = require("fs");
const Path = require('path');
const fetch = require('node-fetch');

const existPath = (ruta) => fs.existsSync(ruta);

const isAbsolute = (ruta) => Path.isAbsolute(ruta);

const getAbsolute = (ruta) => Path.resolve(ruta);

const isFolder = (ruta) => fs.statSync(ruta).isDirectory();

const getFileExtension = (ruta) => Path.extname(ruta)

const getData = (path) => {
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
const validate = (obj) => {
    return fetch(obj.href).then(Response => {
        obj.status = Response.status;
        obj.ok = Response.ok;
        return obj;
    }).catch(error => {
        obj.status = 404;
        obj.ok = false;
        return obj;
    });
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
};