import puppeteer from 'puppeteer'

const URL = 'https://soysocio.bocajuniors.com.ar/'

const openBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--auto-audio'],
    args: ['--autoplay-policy-no=user-gesture-required']
  })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation({
    waitUntil: 'domcontentloaded'
  })

  await page.goto(URL)
  await navigationPromise

  await page.click('#loginButton2')
  await navigationPromise
  const popupTarget = await browser.waitForTarget(
    (target) => target.url() === 'about:blank'
  )

  const popupPage = await popupTarget.page()

  await popupPage.waitForSelector('#email')
  await popupPage.type('#email', 'nicojoaquin1998@gmail.com')
  await popupPage.type('#password', 'nicolasjm98')

  await popupPage.click('form button[type="submit"]')

  await page.waitForSelector('.overlay')

  // await browser.close();
}

openBrowser()
