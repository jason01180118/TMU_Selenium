const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const debuggingMode = true;
// Open debugging browser in terminal
// chrome.exe  --remote-debugging-port=9222 --user-data-dir='C:\Users\zithr\Desktop\browser'

(async function main() {
  // gmail account
  const account = ''

  // gmail password
  const password = ''

  // const userName='USER'
  const options = new chrome.Options()
  // options.addArguments(`user-data-dir=C:\\Users\\${userName}\\AppData\Local\\Google\\Chrome\\User Data`)

  const alertHandler = async function () {
    await driver.wait(until.alertIsPresent())
    const alert = await driver.switchTo().alert()
    await alert.accept()
  }

  const fillQuestion = async function () {
    await driver.switchTo().defaultContent()
    await driver.wait(until.elementsLocated(By.name('viewFrame')))
    await driver.switchTo().frame(driver.findElement(By.name('viewFrame')))

    await driver.wait(until.elementLocated(By.id('table2')))
    const table2 = await driver.findElement(By.id('table2'))
    const inputs = await table2.findElements(By.css('input[type="radio"]'))
    for (let i = 0; i < inputs.length; i++) {
      // console.log(inputs[i])
      driver.executeScript('arguments[0].checked=true', inputs[i])
    }
    // SAVE_BTN2
    await driver.wait(until.elementLocated(By.id('SAVE_BTN2')))
    const saveBTN = await driver.findElement(By.id('SAVE_BTN2'))
    saveBTN.click()
  }

  // Connect to debugging browser
  if (debuggingMode) {
    options.debuggerAddress('127.0.0.1:9222')
  }

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
  try {
    // In debugging mode
    if (!debuggingMode) {
      await driver.get('https://accounts.google.com/')

      await driver.findElement(By.name('identifier')).sendKeys(account)
      driver.findElement(By.name('identifier')).sendKeys(Key.ENTER)

      await driver.wait(until.elementsLocated(By.name('Passwd')))
      await driver.wait(
        until.elementIsVisible(driver.findElement(By.name('Passwd')))
      )

      await driver.findElement(By.name('Passwd')).sendKeys(password)
      driver.findElement(By.name('Passwd')).sendKeys(Key.ENTER)

      await driver.wait(until.urlContains('myaccount.google.com'))
    }
    await driver.get('https://newacademic.tmu.edu.tw/')
    await driver.wait(until.elementsLocated(By.id('LGOIN_BTN1')))
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.id('LGOIN_BTN1')))
    )
    await driver.findElement(By.id('LGOIN_BTN1')).click()

    await driver.wait(until.elementsLocated(By.name('mainFrame')))
    // go to mainFrame
    await driver.switchTo().frame(driver.findElement(By.name('mainFrame')))

    // xapth: find <span id = 'DataGrid*'>
    const elements = await driver.findElement(
      By.xpath('//span[starts-with(@id, "DataGrid")]')
    )
    // console.log(elements)
    await elements.click()

    await driver.wait(until.elementsLocated(By.id('PC_PageSize')))
    await driver.findElement(By.id('PC_PageSize')).sendKeys(1000)
    await driver.findElement(By.id('PC_PageSize')).sendKeys(Key.ENTER)

    while (true) {
      // console.log('Starting sleep() function...')
      await driver.sleep(2000)
      // console.log('End sleep() function...')

      // console.log('Starting defaultContent() function...')
      await driver.switchTo().defaultContent()
      // console.log('End defaultContent() function...')

      // console.log('Starting locateMain() function...')
      await driver.wait(until.elementsLocated(By.name('mainFrame')))
      // console.log('End locateMain() function...')

      // console.log('Starting switchMain() function...')
      await driver.switchTo().frame(driver.findElement(By.name('mainFrame')))
      // console.log('End switchMain() function...')

      // console.log('Starting waitLocated() function...')
      await driver.wait(
        until.elementLocated(
          By.id('DataGrid')
        )
      )
      // console.log('End waitLocated() function...')

      // console.log('Starting findDataGrid() function...')
      const sortTable = await driver.findElement(
        By.id('DataGrid')
      )
      // console.log('End findDataGrid() function...')

      // console.log('Starting execteScript() function...')
      await driver.executeScript('arguments[0].getElementsByTagName("a")[11].click()', sortTable)
      // console.log('End execteScript() function...')

      await alertHandler()
      await fillQuestion()
      await alertHandler()
    }

  } finally {
    //     await driver.quit();
  }
})()
