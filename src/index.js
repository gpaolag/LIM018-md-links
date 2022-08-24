const utils = require('./utils.js');
const Path = require('path');

const mdLinks = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    //console.log(utils.getAbsolute(path));
    if (utils.existPath(utils.getAbsolute(path))) {

      if (!utils.isAbsolute(path)) {
        path = utils.getAbsolute(path)
      }
      if (utils.isFolder(path)) {
        const listFiles = utils.readFolder(path)
        const promiseList = listFiles.map((pathFile) => mdLinks(pathFile, options));
        resolve(Promise.all(promiseList))
      }
      if (options.validate) {
        const urlS = utils.getData(path);
        if (urlS === 'No es un archivo md') {
          reject('No es un archivo md')
        }
        utils.validate(urlS).then((files) => {
          resolve(files);
        })
      }
      if (options.stats) {
        const urlS = utils.getData(path);
        if (urlS === 'No es un archivo md') {
          reject('No es un archivo md')
        }
        resolve(utils.stats(urlS))
      }
    } else {
      reject("la ruta no existe");
    }

  }).catch(err => console.log(err));
}

// mdLinks('pruebas1', { stats: true }).then(resolve => {
//   console.log(resolve)
// })
module.exports = { mdLinks, }