const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    timedOut: 30000,
    ignoreHTTPSErrors: true,
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('https://www.pexels.com/')
  const imgList = await page.evaluate(() => {
    let ji
  })
  imgUrl.forEach((item, index) => {
    console.log(`第${index}张照片`)
    console.log(item)
  })
  await browser.close()
})()
