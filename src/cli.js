const { resolve } = require('path');
const mdLinks2 = require('./index.js')
const utils = require('./utils.js')

let inputPath = process.argv[2];

const options = process.argv;
const mdLinksStats = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { stats: true }).then(result => {
        console.log('TOTAL: ', result.total);
        console.log('UNIQUE: ', result.unique);
    })
}
const mdLinksDefault = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        console.log('LINKS ENCONTRADOS:');
        result.forEach(element => {
            console.log(element.href, ' ', element.text);
        });
    }).catch(err => console.log(err));
}
const mdLinksValidate = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        console.log('LINKS ENCONTRADOS:');
        result.forEach(element => {
            console.log(element.href, ' ', element.status, ' ', element.statusText, ' ', element.text);
        });
    }).catch(err => console.log(err));
}
const mdLinksCombinate = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        let broken = 0;
        result.forEach(element => {
            if (element.status !== 200) {
                broken++;
            }
        });
        mdLinks2.mdLinks(inputPath, { stats: true }).then(result => {
            console.log('TOTAL: ', result.total);
            console.log('UNIQUE: ', result.unique);
            console.log('BROKEN: ', broken);
        })
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

