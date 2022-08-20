const mdLinks = require('../');
const utils = require('../src/utils.js');
const testPath = 'prueba.md'
const pathAbsolute = 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba.md'
const testFile = `[Google](https://google.com) es un lenguaje de marcado ligero muy popular entre developers.`
const resutlLinks = [
  {
    text: "Google",
    href: "https://google.com",
    path: "D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba.md",
  }];

describe('Ruta absoluta', () => {
  it('Si la ruta no es absoluta, la convierte', () => {
    expect(utils.getAbsolute(testPath)).toBe(pathAbsolute)
  })
});

describe('Verificar la ruta absoluta', () => {
  it('Si la ruta es absoluta, devuelve true, caso contrario false', () => {
    expect(utils.isAbsolute(testPath)).toBe(false)
  })
});

describe('Devolver los links', () => {
  it('El metodo busca dentro del archivo y retorna todas las rutas', () => {
    expect(utils.getLinks(testFile, pathAbsolute)).toStrictEqual(resutlLinks)
  })
});

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
