import w from 'worker_threads'
import axios from 'axios'
import cheer from "cheerio"
import {parseDocument} from 'htmlparser2'
import {writeFile} from "fs";
import puppeteer from 'puppeteer'

var elperuano="https://elperuano.pe/Politica"
var republica="https://larepublica.pe/mundo/"


// getUrls(elperuano,republica)


function savePage(data){
    writeFile("webpage.html",data,err=>{
        console.log(err)
    })
}

function getUrls(...args){
    args.forEach(url=>{
        axios.get(url).then(({data})=>{
            console.log("**************************")
            console.log(url)
            console.log("**************************")

            let docParse=parseDocument(data)
        })
    })
}


w.parentPort?.postMessage({data:{},date:new Date().getDate()})
//
// const {Worker} = require('worker_threads')
// const runService = (WorkerData) => {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker('./workerExample.js', {WorkerData});
//         worker.on('message', resolve);
//         worker.on('error', reject);
//         worker.on('exit', (code) => {
//             if (code !== 0)
//       reject(new Error(`stopped with  ${code} exit code`));
//         })
//     })
// }
//
// const run = async () => {
//     const result = await runService('hello node.js')
//     console.log(result);
// }
//
// run().catch(err => console.error(err))