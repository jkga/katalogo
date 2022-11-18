#!/usr/bin/env node
const { readFile, writeFile } = require('fs')
const chalk = require('chalk')
const ignoredFile = ['w', 'x']

const readJSONFile = (fileName) => {
  return import(`../contents/${fileName}.json`, {
    assert: { type: "json" }
  }).then(res => {
    let obj = {}
    obj[fileName] = res.default
    return obj
  }).catch(err => {
    return {error: `${fileName}.json : ` + err.toString()}
  })
}

const readAllFiles = async () => {
  let promisedFiles = []
  // count a - z
  let x = 0

  for(x = 0 ; x < 26; x++) {
    let prom = await new Promise((resolve, reject) => {
      if(ignoredFile.indexOf(String.fromCharCode(97 + x)) != -1) {
        let obj = {}
        obj[String.fromCharCode(97 + x)] = []
        return resolve(obj)
      }
      resolve(readJSONFile(String.fromCharCode(97 + x)))
    })
    promisedFiles.push(prom)
  }

  // show results
  Promise.all(promisedFiles).then(res => {

    let failedPromises = res.filter((el, index) => el.error)
    let fulfilledPromises = res.filter((el, index) => !el.error)
    console.log(res)
    console.log("=========================")
    console.log("|     Results           |")
    console.log("=========================")
    console.log(chalk.gray(`Checked: ${res.length - ignoredFile.length}/${x-ignoredFile.length}`))
    console.log(chalk.greenBright(`Passed: ${fulfilledPromises.length < ignoredFile.length ? fulfilledPromises.length : (fulfilledPromises.length - ignoredFile.length)}/${x-ignoredFile.length}`))
    console.log(chalk.redBright(`Failed: ${failedPromises.length}`))

    // Stop when something undesirable things happened
    if(failedPromises.length) {
      console.log(chalk.redBright("============================================================"))
      console.log(chalk.bgRedBright(chalk.black("WARNING: Unable to proceed. Please check all the files first")))
      console.log(chalk.redBright("============================================================"))
      return 0
    }

    // Writer merged data
     writeFile(__dirname + '/../contents/data.json', JSON.stringify(res), 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.greenBright("=================================================="))
      console.log(chalk.bgGreenBright(chalk.black("Writing to data.json was successful!")))
      console.log(chalk.greenBright("=================================================="))
    })

  }).catch(err => {
    throw new Error('Something went wrong. Please make sure that all JSON files contain a valid content', err)
  })
}

const init = () => {
  console.log("Checking Files....")
  readAllFiles()
}

init()
