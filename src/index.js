const utils = require('./utils.js');
const Path = require('path');
const fetch = require('node-fetch');
const { resolve } = require('path');
const { resolveSoa } = require('dns');

function mdLinks(path, options) {

  if (!utils.existPath(path)) {
    return console.log("la ruta no existe");
  }
  if (!utils.isAbsolute(path)) {
    path = utils.getAbsolute(path)
  }
  if (options) {
    const urlS = utils.getData(path);
    const datos = urlS.map(elem => utils.validate(elem));
    return Promise.all(datos).then(resolve => {
      console.log(resolve);
    });
  };
  console.log(datos);
  return datos;
  //console.log("esta: " + urlRevision);
};

// const path1 = utils.getAbsolute('prueba2.md')
// console.log('entro aqui', path1);
console.log(mdLinks('prueba2.md', true));
utils.validate({
  text: 'https://www.facebook.com/',
  href: 'https://www.facebook45.com/',
  path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba2.md'
});

module.exports = () => {
  // ...
};
