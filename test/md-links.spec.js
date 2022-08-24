const utils = require('../src/utils.js');
const fetch = require('node-fetch');
jest.mock('node-fetch', () => jest.fn())
const mdLinks = require('../src/index.js')
//const utils2 = require('./_mocks_/node-fetch.ja')

const testPath = 'prueba.md'
const pathAbsolute = 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba.md'
const testFile = `[Google](https://google.com) es un lenguaje de marcado ligero muy popular entre developers.`
const resutlLinks = [
  {
    text: "Google",
    href: "https://google.com",
    path: "D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba.md",
  }];

const resultValidate = [
  {
    text: 'Google',
    href: 'https://google.com',
    path: 'D:\\Laboratoria\\Cuarto proyecto\\LIM018-md-links\\prueba.md',
    status: 200,
    statusText: 'OK'
  }
]
const resultStats = { total: 1, unique: 1 }
const resultFileStats = [
  { total: 5, unique: 5 },
  { total: 4, unique: 4 },
  { total: 1, unique: 1 }
];

describe('Ruta Existente', () => {
  it('Si la ruta existe devuelve true', () => {
    expect(utils.existPath(pathAbsolute)).toBe(true)
  })
});

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
    expect(utils.getLinks(testFile, pathAbsolute)).toEqual(resutlLinks)
  })
});

describe('Devolver links con datos', () => {
  it('El metodo busca dentro del archivo y retorna todas las rutas', () => {
    expect(utils.getData(pathAbsolute)).toEqual(resutlLinks)
  })
});

//Test de mdLinks

describe('Validate mdLinks', () => {
  it('El metodo busca dentro del archivo y retorna todas las rutas', () => {
    const resultado = mdLinks.mdLinks(('prueba5.md'), { validate: true });
    resultado.catch(resp => expect(resp).toStrictEqual('la ruta no existe'))
  })
});

describe('Stats mdLinks', () => {
  it('El metodo busca dentro del archivo y retorna todas las rutas', () => {
    const resultado = mdLinks.mdLinks(('prueba.md'), { stats: true });
    resultado.then(resp => expect(resp).toStrictEqual(resultStats))
  })
});

describe('ruta inexistente mdLinks', () => {
  it('El metodo devuelve el valor de que no existe la ruta', () => {
    const resultado = mdLinks.mdLinks(('prueba5.md'), { stats: true });
    resultado.catch(resp => expect(resp).toStrictEqual('la ruta no existe'))
  })
});

describe('Stats mdLinks con folders', () => {
  it('El metodo busca dentro del archivo y retorna todas las rutas', () => {
    const resultado = mdLinks.mdLinks(('pruebas1'), { stats: true });
    resultado.then(resp => expect(resp).toStrictEqual(resultFileStats))
  })
});

describe('MDLINKS', () => {
  it('MD-LINKS validate true', (done) => {
    fetch.mockResolvedValueOnce({ status: 200, statusText: 'OK' });
    mdLinks.mdLinks('prueba.md', { validate: true }).then((link) => {
      expect(link).toEqual(resultValidate);
      done();
    })
  })
});

describe('MDLINKS false', () => {
  it('MD-LINKS validate true, con url que no existe', () => {
    fetch.mockResolvedValueOnce({ status: 200, statusText: 'OK' });
    mdLinks.mdLinks('prueba5.md', { validate: true }).catch((link) => {
      expect(link).toStrictEqual('la ruta no existe');

    })
  });
});

