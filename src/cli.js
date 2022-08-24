const { resolve } = require('path');
const mdLinks2 = require('./index.js')
const utils = require('./utils.js')

let inputPath = process.argv[2];

const options = process.argv;
const mdLinksStats = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { stats: true }).then(result => {
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            let total = 0;
            let unique = 0;
            arrNew.forEach(element => {
                total = total + element.total;
                unique = unique + element.unique;
            })
            console.log('TOTAL: ', total);
            console.log('UNIQUE: ', unique);
        } else {
            console.log('TOTAL: ', result.total);
            console.log('UNIQUE: ', result.unique);
        }
    }).catch(err => console.log(err));
}
const mdLinksDefault = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            console.log('LINKS ENCONTRADOS:');
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            arrNew.forEach(element => {
                console.log(element.href, ' ', element.text);
            });
        } else {
            console.log('LINKS ENCONTRADOS:');
            result.forEach(element => {
                console.log(element.href, ' ', element.text);
            });
        }
    }).catch(err => console.log(err));
}
const mdLinksValidate = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            console.log('LINKS ENCONTRADOS:');
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            arrNew.forEach(element => {
                console.log(element.href, ' ', element.status, ' ', element.statusText, ' ', element.text);
            });
        } else {
            console.log('LINKS ENCONTRADOS:');
            result.forEach(element => {
                console.log(element.href, ' ', element.status, ' ', element.statusText, ' ', element.text);
            });
        }
    }).catch(err => console.log(err));
}
const mdLinksCombinate = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        let broken = 0;
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            arrNew.forEach(element => {
                if (element.status !== 200) {
                    broken++;
                }
            });
        } else {
            result.forEach(element => {
                if (element.status !== 200) {
                    broken++;
                }
            });
        }
        mdLinks2.mdLinks(inputPath, { stats: true }).then(result => {
            if (utils.isFolder(utils.getAbsolute(inputPath))) {
                const arrNew = result.reduce((x, y) => x.concat(y), [])
                let total = 0;
                let unique = 0;
                arrNew.forEach(element => {
                    total = total + element.total;
                    unique = unique + element.unique;
                })
                console.log('TOTAL: ', total);
                console.log('UNIQUE: ', unique);
                console.log('BROKEN: ', broken);
            } else {
                console.log('TOTAL: ', result.total);
                console.log('UNIQUE: ', result.unique);
                console.log('BROKEN: ', broken);
            }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

//Opciones de ingresos como argumentos
if (options.length === 3) {
    mdLinksDefault(inputPath);
}
if (options.length === 4) {
    if (options[3] === '--stats') {
        mdLinksStats(inputPath);
    }
    if (options[3] === '--validate') {
        mdLinksValidate(inputPath);
    }
}
if (options.length === 5) {
    mdLinksCombinate(inputPath);
}

