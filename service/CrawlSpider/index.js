const puppeteer = require('puppeteer')
const url = 'http://es6.ruanyifeng.com'
;(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto(url)
  imgUrl.forEach((item, index) => {
    console.log(`第${index}张照片`)
    console.log(item)
  })
  await browser.close()
})()
