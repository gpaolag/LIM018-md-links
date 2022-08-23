const utils = require('./utils.js');
const Path = require('path');

const mdLinks = (path, options = {}) => {
  return new Promise((resolve, reject) => {

    if (!utils.existPath(path)) {
      resolve("la ruta no existe");
    }
    if (!utils.isAbsolute(path)) {
      path = utils.getAbsolute(path)
    }
    const urlS = utils.getData(path);
    if (options.validate) {
      utils.validate(urlS).then((files) => {
        resolve(files);
      })
    }
    if (options.stats) {
      resolve(utils.stats(urlS))
    }
  })
}

mdLinks('D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba5.md', { stats: true }).then(resolve => {
  console.log(resolve)
})
// const datosr = utils.validate([
//   {
//     text: 'Google',
//     href: 'https://google.com',
//     path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba2.md'
//   },
//   {
//     text: 'Node.js',
//     href: 'https://nodejs.org/',
//     path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba2.md'
//   },
//   {
//     text: 'GitHub',
//     href: 'https://github76.com/',
//     path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba2.md'
//   },
//   {
//     text: 'https://www.facebook.com/',
//     href: 'https://www.facebook.com/',
//     path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba2.md'
//   }
// ])
//console.log(datosr);

module.exports = { mdLinks, }