#!/usr/bin/env node
const { readFile, writeFile } = require('fs')

const readJSONFile = (fileName) => {
  return import(`../contents/${fileName}.json`).then(res => {
    let obj = {}
    obj[fileName] = res.default.length
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
      resolve(readJSONFile(String.fromCharCode(97 + x)))
    })
    promisedFiles.push(prom)
  }

  // show results
  Promise.all(promisedFiles).then(res => {
    let failedPromises = res.filter((el, index) => el.error)
    let fulfilledPromises = res.filter((el, index) => !el.error)
    
    console.log("=========================")
    console.log("|     Results           |")
    console.log("=========================")
    console.log(`Checked: ${res.length}/${x}`)
    console.log(`Passed: ${fulfilledPromises.length}/${x}`)
    console.log(`Failed: ${failedPromises.length}`)

    // Stop when something undesirable things happened
    if(failedPromises.length) {
      console.log("============================================================")
      console.log('WARNING: Unable to proceed. Please check all the files first')
      console.log("============================================================")
      return 0
    }

    // Update README.md
    readFile(__dirname + '/../templates/readme.md','utf8',(async (fileErr, data) => {
      if (fileErr) throw fileErr

      let nData = data
      await Promise.all(fulfilledPromises.map(async(el, index) => {
        nData = nData.replace(`<!--display-raw-${Object.keys(el)}-->`, Object.values(el))
        nData = await Promise.resolve(nData)
      }))
      
      // write template
      writeFile(__dirname + '/../../readme.md', nData, 'utf8', function (err) {
        if (err) return console.log(err)
        console.log("==================================================")
        console.log('Writing to README.md is successful!')
        console.log("==================================================")
      })
    }))
  }).catch(err => {
    throw new Error('Something went wrong. Please make sure that all JSON files contain a valid content', err)
  })
}

const init = () => {
  console.log("Checking Files....")
  readAllFiles()
}

init()
