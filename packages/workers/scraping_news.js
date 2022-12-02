import puppeteer from 'puppeteer'
import {writeFile} from "fs";
import cheerio from "cheerio"

async function main() {
    var elperuano = "https://elperuano.pe/Politica"
    var republica = "https://larepublica.pe/mundo/"
}

function savePage(name, data) {
    writeFile(name, data, err => {
        console.log(err)
    })
}

function saveJson(name,data){
    writeFile(name, JSON.stringify(data), err => {
        console.log(err)
    })

}

class WebScraping {

    page = {}
    browser = {}

    async initialize(url) {
        this.browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true

        });
        let pg = await this.browser.newPage();
        await pg.goto(url, {
            waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle0"]
        });

        this.page = pg
    }

    async scrapElPeruano() {
        console.log("scraping el peruano")
        await this.initialize("https://elperuano.pe/Politica")
        await this.page.waitForSelector(".titular")
        let content = await this.page.content()
        let $ = this.html(content)
        savePage("elperuano.html", content)

        let elements = []
        $(".card").each((i, item) => {
                // console.log($(item).html())

                let subEl = cheerio.load($(item).html())

                elements.push({
                    titular: subEl(".titular").text(),
                    contenido: subEl(".bajada").text()
                })

            }
        )
        saveJson("elperuano.json", elements)
        await this.close()
    }

    async scrapRepublica() {
        let content = await this.initialize("https://larepublica.pe/mundo/")
        savePage(content)
    }

    html(webPage) {
        return cheerio.load(webPage)
    }

    async close() {

        await this.browser.close();
    }
}

(async () => {
        let scrap = new WebScraping()
        await scrap.scrapElPeruano()
    }

)()
