const puppeteer = require('puppeteer')
const catLitterUrl =
  'https://www.spokojenypes.cz/steliva-pro-kocky/?par=typ-steliva|silikagelove'
let page
let browser
let litterArr = []
class CatLitters {
  // We will add 3 methods here
  // Initializes and create puppeteer instance
  static async init() {
    browser = await puppeteer.launch({
      // headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Window
        '--disable-gpu',
      ],
    })
    page = await browser.newPage()
    await Promise.race([
      await page
        .goto(catLitterUrl, { waitUntil: 'networkidle2' })
        .catch(() => {}),
      await page.waitForSelector('.productBox_product').catch(() => {}),
    ])
  }
  // Visits the page, retrieves the job
  static async resolver() {
    await this.init()
    const catLitterUrls = await page.evaluate(() => {
      const litters = document.querySelectorAll('.productBox_product')
      litterArr = Array.from(litters)
      const litterLinks = []
      litterArr.map((litter) => {
        const litterTitle = litter.querySelector('.product-name > a')
        const litterDesc = litter.querySelector('.product-anotation')
        const litterStorage = litter.querySelector('.avail-store')
        const { text } = litterTitle.textContent
        const { host } = litterTitle
        const { protocol } = litterTitle
        const pathName = litterTitle.pathname
        const query = litterTitle.search
        const titleURL = protocol + '//' + host + pathName + query
        litterLinks.push({
          titleText: text,
          titleURLHost: host,
          titleURLPathname: pathName,
          titleURLSearchQuery: query,
          titleURL: titleURL,
          titleDesc: litterDesc.innerHTML,
          titleStorage: litterStorage.textContent,
        })
      })
      return litterLinks
    })
    return catLitterUrls
  }
  // Converts the cat litters to array
  static async getCatLitters() {
    const catLitters = await this.resolver()
    await browser.close()
    const data = {}
    data.catLitters = this.resolveCatLitter(catLitters)
    data.total_catLitters = catLitters.length
    return data
  }

  static resolveCatLitter(catLitters) {
    const resolvedCatLitter = catLitters.map((catLitter) => {
      const resolvedCatLitter = {}
      resolvedCatLitter.title = catLitter.titleText
      resolvedCatLitter.website = catLitter.titleURLHost
      resolvedCatLitter.description = catLitter.titleDesc
      resolvedCatLitter.url = catLitter.titleURL
      resolvedCatLitter.date = catLitter.titleStorage
      return resolvedCatLitter
    })
    return resolvedCatLitter
  }
}

export default CatLitters
