
const fs =require("fs")
const chalk = require('chalk');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');
var array = []
const mail = new JSONdb('/mail.json')
const ProgressBar = require('cli-simple-progress');
var cred = {}
const bar = new ProgressBar({
    width: 30,
    template: `CLI Progress | ${chalk.bgCyan('{complete}')}${chalk.bgWhite('{incomplete}')} | {percent}% | {current}/{total}`,
    complete: ' ',
    incomplete: ' '
  });


// add bars
async function analyse(element){
    var temp = fs.readFileSync(`./txt/${element}`).toString().split("\n")

var len = temp.length
console.log(len)
var bare = new ProgressBar({
    width: 100,
    template: `CLI Progress | ${chalk.bgCyan('{complete}')}${chalk.bgWhite('{incomplete}')} | {percent}% | {current}/{total}`,
    complete: '=',
    incomplete: '-'
  });
for (let i = 0; i < temp.length; i++) {
var data =temp[i].split(':')
var pour = (i / (temp.length)) * 100
bare.update(pour);
var js ={"mail":data[0],"password":data[1]}

array.push(js)
mail.set("mail",array)

}
}

// control bars
async function main (){
var file =fs.readdirSync("./txt")


for (let index = 0; index < file.length; index++) {
    
const element = file[index];
await analyse(element)
}
mail.set("mail",array)
} 
main()