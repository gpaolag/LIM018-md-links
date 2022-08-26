#!/usr/bin/env nodeL
const { resolve } = require('path');
const mdLinks2 = require('./index.js')
const utils = require('./utils.js')
const chalk = require('chalk')

let inputPath = process.argv[2];

const options = process.argv;
const mdLinksStats = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { stats: true }).then(result => {
        console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
        console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📊  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            let total = 0;
            let unique = 0;
            arrNew.forEach(element => {
                total = total + element.total;
                unique = unique + element.unique;
            })
            console.log(chalk.bgHex('#fff').black.bold('📶 TOTAL:  '), chalk.green.bold(total));
            console.log(chalk.bgHex('#fff').black.bold('✅ UNIQUE: '), chalk.green.bold(unique));
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        } else {
            console.log(chalk.bgHex('#fff').black.bold('📶 TOTAL:  '), chalk.green.bold(result.total));
            console.log(chalk.bgHex('#fff').black.bold('✅ UNIQUE: '), chalk.green.bold(result.unique));
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        }
    }).catch(err => console.log(err));
}
const mdLinksDefault = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📜  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            arrNew.forEach(element => {
                console.log('✅ ' + element.href, ' ', element.text);
            });
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        } else {
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📜  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
            result.forEach(element => {
                console.log('✅ ' + element.href, ' ', element.text);
            });
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        }
    }).catch(err => console.log(err));
}
const mdLinksValidate = (inputPath) => {
    mdLinks2.mdLinks(inputPath, { validate: true }).then(result => {
        if (utils.isFolder(utils.getAbsolute(inputPath))) {
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📜  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
            const arrNew = result.reduce((x, y) => x.concat(y), [])
            arrNew.forEach(element => {
                console.log('✅ ' + element.href, ' ', element.status, ' ', element.statusText, ' ', element.text);
            });
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
        } else {
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📜  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
            result.forEach(element => {
                console.log('✅ ' + element.href, ' ', element.status, ' ', element.statusText, ' ', element.text);
            });
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
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
            console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
            console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            console.log(chalk.bgHex('#ffdf00').black.bold.underline('|' + '              📊  LINKS ENCONTRADOS:                   ' + '|' + '\n'));
            if (utils.isFolder(utils.getAbsolute(inputPath))) {
                const arrNew = result.reduce((x, y) => x.concat(y), [])
                let total = 0;
                let unique = 0;
                arrNew.forEach(element => {
                    total = total + element.total;
                    unique = unique + element.unique;
                })
                console.log(chalk.bgHex('#fff').black.bold('📶 TOTAL: '), chalk.green.bold(total));
                console.log(chalk.bgHex('#fff').black.bold('✅ UNIQUE: '), chalk.green.bold(unique));
                console.log(chalk.bgHex('#fff').black.bold('❌ BROKEN: '), chalk.red.bold(broken));
                console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
                console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            } else {
                console.log(chalk.bgHex('#fff').black.bold('📶 TOTAL: '), chalk.green.bold(result.total));
                console.log(chalk.bgHex('#fff').black.bold('✅ UNIQUE: '), chalk.green.bold(result.unique));
                console.log(chalk.bgHex('#fff').black.bold('❌ BROKEN: '), chalk.red.bold(broken));
                console.log(chalk.hex('#ff5800').bold('_________________________________________________________'));
                console.log(chalk.hex('#ff5800').bold('---------------------------------------------------------'));
            }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

const help = `
                                                    BIENVENIDO A MD-LINKS                                                   
                                                                                                                             
                This is a tool that allows you to identify the state of the links of the desired Markdown (.md) file.'       
                + ' It offers support for both files and directories. Also, it lets you know some interesting statistics!    
                                                                                                                             
                Ingrese una de las siguientes opciones (la ruta puede ser absoluta o relativa):                              
                ╔══════════════════════════════════════════╦═════════════════════════════════════════════════════════════════╗
                ║    OPTIONS                               ║               OUTPUT                                            ║
                ║                                          ║                                                                 ║
                ║══════════════════════════════════════════║═════════════════════════════════════════════════════════════════║
                ║  mdLinks <ruta>                          ║  Muestra los links encontrados con su texto y ruta.             ║
                ║                                          ║                                                                 ║
                ║══════════════════════════════════════════║═════════════════════════════════════════════════════════════════║
                ║  mdLinks <ruta> --validate               ║  Muestra los links encontrados con su texto,                    ║
                ║                                          ║  ruta, status y mensaje del status.                             ║
                ║══════════════════════════════════════════║═════════════════════════════════════════════════════════════════║
                ║  mdLinks <ruta> --stats                  ║  Muestra la estadística de los links                            ║
                ║                                          ║  encontrados y links únicos.                                    ║
                ║══════════════════════════════════════════║═════════════════════════════════════════════════════════════════║
                ║  mdLinks <ruta> --stats --validate       ║   Muestra la estadística de los links encontrados,              ║
                ║  mdLinks <ruta> --validate --stats       ║   links únicos y links rotos.                                   ║
                ║══════════════════════════════════════════║═════════════════════════════════════════════════════════════════║
                ║  mdLinks --help                          ║   Muestra los comandos y su funcion                             ║
                ║                                          ║                                                                 ║
                ╚══════════════════════════════════════════╩═════════════════════════════════════════════════════════════════╝
`;

//Opciones de ingresos como argumentos
if (options.length === 2) {
    console.log(chalk.hex('#ff5800').bold(help));
}
if (options.length === 3) {
    if (options[2] === '--help') {
        console.log(chalk.hex('#ff5800').bold(help));
    } else {
        mdLinksDefault(inputPath);
    }
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
    if (options[3] === '--stats' && options[4] === '--validate' || options[3] === '--validate' && options[4] === '--stats') {
        mdLinksCombinate(inputPath);
    } else {
        console.log(chalk.blueBright(help));
    }
}

