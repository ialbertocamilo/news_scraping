import puppeteer from 'puppeteer'
import {writeFile} from "fs";
import cheerio from "cheerio"
import {$log} from "@tsed/common";
import AWS from "aws-sdk";


function savePage(name, data) {
    // writeFile(name, data, (err) => {
    //     if (err) console.log(err)
    // })
}

function saveJson(name, data) {
    writeFile(name, JSON.stringify(data), err => {
        if (err) console.log(err)
    })

}

class WebScraping {

    page = {}
    browser = {}
    dyn = {}


    async initialize(url, networkidle2 = true) {

        AWS.config.update({
            accessKeyId: "AKIAQGR4IWPDTAASZ65B",
            secretAccessKey: "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",
            region: "us-east-1"
        })
        this.dyn = new AWS.DynamoDB.DocumentClient()
        this.browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true
        });
        let pg = await this.browser.newPage();

        let waitUntil = ["load", "domcontentloaded", "networkidle2"]
        if (!networkidle2) {
            waitUntil = ["load", "domcontentloaded"]
        }
        await pg.goto(url, {
            waitUntil: waitUntil, timeout: 0
        });
        this.page = pg
    }

    async scrapElPeruano() {
        console.log("scraping el peruano")
        await this.initialize("https://elperuano.pe/Politica")
        await this.page.waitForSelector(".titular")
        await this.page.waitForSelector(".cursornoticia")
        let content = await this.page.content()
        let $ = this.html(content)
        savePage("elperuano.html", content)
        let elements = []
        $("article").each((i, item) => {
            let subEl = cheerio.load($(item).html())
            if (subEl(".bajada").text() !== "") {
                this.writeDB({
                    title: subEl(".titular").text(),
                    content: subEl(".bajada").text(),
                    img: subEl(".fotonoticia").find("a img").attr("src"),
                    link: "https://www.elperuano.pe/" + subEl(item).find(".card-title2 a").attr("href"),
                    source:"peruano-politiica",
                    source_title:"El Peruano Politica"
                })
            }

        })
        // saveJson("elperuano.json", elements)
        // await this.close()
    }

    async scrapRepublica() {
        console.log("scraping la republica")
        await this.initialize("https://larepublica.pe/mundo/")
        await this.page.waitForSelector(".contenido_destacado")
        let content = await this.page.content()
        // savePage('republica mundo.html', content)

        let $ = this.html(content)

        let els = []
        $(".CardMainContent").each((i, item) => {
            if ($(item).text() !== "") {
                this.writeDB({
                    content: $(item).find("a").text(),
                    link: $(item).find("a").attr("href"),
                    img: $(item).find("img").attr("src"),
                    source:"republica-mundo",
                    source_title:"La Republica Mundo"
                })
            }
        })
        $(".CardSectionContent").each((i, item) => {
            if ($(item).text() !== "") {
                this.writeDB({
                    content: $(item).find("a").text(),
                    link: $(item).find("a").attr("href"),
                    img: $(item).find("img").attr("srcset"),
                    source:"republica-mundo",
                    source_title:"La Republica Mundo"
                })
            }
        })
        // saveJson("la republica mundo.json", els)


        // await this.close()
    }


    async scrapLaRepublicaPolitica() {
        console.log("scraping la republica politica")
        await this.initialize("https://larepublica.pe/politica/")
        await this.page.waitForSelector(".contenido_destacado")
        let content = await this.page.content()
        // savePage('republica mundo.html', content)

        let $ = this.html(content)

        let els = []
        $(".CardMainContent").each((i, item) => {
            if ($(item).text() !== "") {
                this.writeDB({
                    content: $(item).find("a").text(),
                    link: $(item).find("a").attr("href"),
                    img: $(item).find("img").attr("src"),
                    source:"republica-politica",
                    source_title:"La Republica Politica"
                })
            }
        })
        $(".CardSectionContent").each((i, item) => {
            if ($(item).text() !== "") {
                this.writeDB({
                    content: $(item).find("a").text(),
                    link: $(item).find("a").attr("href"),
                    img: $(item).find("img").attr("srcset"),
                    source:"republica-politica",
                    source_title:"La Republica Politica"
                })
            }
        })
        // saveJson("la republica politica.json", els)


        // await this.close()
    }

    async scrapElComercio() {
        console.log("Scraping el Comercio")

        await this.initialize("https://elcomercio.pe/mundo/")
        await this.page.waitForSelector(".fs-wi__title")
        let content = await this.page.content()
        savePage('el comercio mundo.html', content)
        let $ = this.html(content)
        let els = []
        $(".fs-container").each((i, item) => {

            this.writeDB({
                content: $(item).find(".fs-wi__title").text(),
                link: "https://www.elcomercio.pe" + $(item).find(".fs-wi__title a").attr("href"),
                img: $(item).find("img").attr("src"),
                source:"comercio-mundo",
                source_title:"El Comercio Mundo"
            })
        })

        // saveJson("el comercio mundo.json", els)
        // await this.close()

    }

    async scrapElComercioPolitica() {

        console.log("Scraping el Comercio Politica")

        await this.initialize("https://elcomercio.pe/politica/")
        await this.page.waitForSelector(".fs-wi__title")
        let content = await this.page.content()
        savePage('el comercio politica.html', content)
        let $ = this.html(content)
        let els = []
        $(".fs-container").each((i, item) => {
            this.writeDB({
                content: $(item).find(".fs-wi__title").text(),
                link: "https://www.elcomercio.pe" + $(item).find(".fs-wi__title a").attr("href"),
                img: $(item).find("img").attr("src"),
                source:"comercio-politica",
                source_title:"El Comercio Politica"
            })
        })

        // saveJson("el comercio politica.json", els)
        // await this.close()
    }

    async scrapGestion() {
        console.log("Scraping el Gestion internacional")

        await this.initialize("https://gestion.pe/mundo/internacional/")
        let content = await this.page.content()
        savePage('gestion mundo.html', content)
        let $ = this.html(content)
        let els = []
        $("article").each((i, item) => {

            if ($(item).find("a").text()) {
                this.writeDB({
                    content: $(item).find(".featured-story__title-link").text(),
                    link: "https://gestion.pe" + $(item).find(".featured-story__img-link").attr("href"),
                    img: $(item).find("a picture source").attr("data-srcset"),
                    source:"gestion-internacional",
                    source_title:"Gestion internacional"
                })
            }
        })

        // saveJson("gestion mundo.json", els)
        // await this.close()
    }

    async scrapGestionPolitica() {

        console.log("Scraping el Gestion Politica")

        await this.initialize("https://gestion.pe/peru/politica/")
        let content = await this.page.content()
        savePage('gestion politica.html', content)
        let $ = this.html(content)
        let els = []
        $("article").each((i, item) => {

            if ($(item).find("a").text()) {
                this.writeDB({
                    content: $(item).find(".featured-story__title-link").text(),
                    link: "https://gestion.pe" + $(item).find(".featured-story__img-link").attr("href"),
                    img: $(item).find("a picture source").attr("data-srcset"),
                    source:"gestion-politica",
                    source_title:"Gestion politica"
                })
            }
        })

        // saveJson("gestion politica.json", els)
        // await this.close()
    }

    async scrapBBC() {

        console.log("Scraping BBC")

        await this.initialize("https://www.bbc.com/mundo", false)
        let content = await this.page.content()
        savePage('bbc.html', content)
        let $ = this.html(content)
        let els = []
        $(".ebmt73l0").each((i, item) => {

            if ($(item).find("a span").text()) {

                this.writeDB({
                    content: $(item).find("a span").text(),
                    link: "https://www.bbc.com/mundo" + $(item).find("a").attr("href"),
                    img: $(item).find("picture img").attr("src"),
                    source:"bbc-mundo",
                    source_title:"BBC mundo"
                })
            }
        })

        // saveJson("bbc mundo.json", els)
        // await this.close()
    }

    html(webPage) {
        return cheerio.load(webPage)
    }

    async writeDB(data,from) {

        let obj = {...data, id: crypto.randomUUID(), created_date: new Date().toJSON()}
        console.log(obj)
        await this.dyn.put({
            TableName: "news",
            Item: obj

        }).promise()


    }

    async getAllEls() {

        console.log(await this.dyn.scan({TableName: 'news'}).promise())
    }

    async close() {
        console.log("Scraping finished.")
        await this.browser.close();
    }
}

class DynamoDb {

    protected
    instance;

    constructor() {
        $log.info("Loading dynamodb 2")
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION
        })
        this.instance = new AWS.DynamoDB.DocumentClient()
        return this.instance
    }

    getInstance() {
        return this.instance;
    }

}

(async () => {

        let scrap = new WebScraping()

        Promise.all([scrap.scrapElPeruano(),
            scrap.scrapRepublica(),
            scrap.scrapLaRepublicaPolitica(),
            scrap.scrapElComercio(),
            scrap.scrapElComercioPolitica(),
            scrap.scrapGestion(),
            scrap.scrapGestionPolitica(),
            scrap.scrapBBC()]).then(async (data) => {
            await scrap.getAllEls()
            scrap.close()
            process.exit()
        })
    }

)
()
