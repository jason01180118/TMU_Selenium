const {Builder, Browser, By, Key, until, Button} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
const { elementLocated } = require('selenium-webdriver/lib/until');
const debuggingMode = true;
// Open debugging browser in terminal
// chrome.exe  --remote-debugging-port=9222 --user-data-dir="C:\Users\zithr\Desktop\browser"

(async function main() {

    

    //gmail account
    const account=''
    //gmail password
    const password=''

    // const userName='USER'
    const options = new chrome.Options();
    // options.addArguments(`user-data-dir=C:\\Users\\${userName}\\AppData\Local\\Google\\Chrome\\User Data`)

    let alertHandler = async function() {
      await driver.wait(until.alertIsPresent())
      let alert = await driver.switchTo().alert()
      await alert.accept();
    }

    let fillQuestion = async function() {
      await driver.switchTo().defaultContent();
      await driver.wait(until.elementsLocated(By.name('viewFrame')))
      await driver.switchTo().frame(driver.findElement(By.name('viewFrame')))
   
      await driver.wait(until.elementLocated(By.id('table2')))
      let table2 = await driver.findElement(By.id('table2'))
      let inputs = await table2.findElements(By.css('input[type="radio"]'))
      for(let i = 0; i < inputs.length; i++) {
         // console.log(inputs[i])
         driver.executeScript('arguments[0].checked=true', inputs[i]);
      }
      // SAVE_BTN2
      await driver.wait(until.elementLocated(By.id('SAVE_BTN2')))
      let saveBTN = await driver.findElement(By.id('SAVE_BTN2'))
      saveBTN.click()
    }

    // Connect to debugging browser
    if(debuggingMode) {
      options.debuggerAddress('127.0.0.1:9222');
    }

    let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {

    // In debugging mode
    if(!debuggingMode) {
    await driver.get('https://accounts.google.com/')
    
    await driver.findElement(By.name('identifier')).sendKeys(account)
    driver.findElement(By.name('identifier')).sendKeys(Key.ENTER)
    
    await driver.wait(until.elementsLocated(By.name('Passwd')))
    await driver.wait(until.elementIsVisible(driver.findElement(By.name('Passwd'))))

    await driver.findElement(By.name('Passwd')).sendKeys(password)
    driver.findElement(By.name('Passwd')).sendKeys(Key.ENTER)

    await driver.wait(until.urlContains('myaccount.google.com'))
    
    
    }
    await driver.get('https://newacademic.tmu.edu.tw/')
    await driver.wait(until.elementsLocated(By.id('LGOIN_BTN1')))
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('LGOIN_BTN1'))))
    await driver.findElement(By.id('LGOIN_BTN1')).click()
    

    await driver.wait(until.elementsLocated(By.name('mainFrame')))
    //go to mainFrame
    await driver.switchTo().frame(driver.findElement(By.name('mainFrame')))
    
    
    // xapth: find <span id = 'DataGrid*'>
    let elements = await driver.findElement(By.xpath('//span[starts-with(@id, "DataGrid")]'))
    // console.log(elements)
    await elements.click()

    
    await driver.wait(until.elementsLocated(By.id('PC_PageSize')))
    await driver.findElement(By.id('PC_PageSize')).sendKeys(1000)
    driver.findElement(By.id('PC_PageSize')).sendKeys(Key.ENTER)
    
    
    await driver.wait(until.elementsLocated(By.xpath('//span[starts-with(@id, "DataGrid")]/a[@href]')))
    let hrefs = await driver.findElement(By.xpath('//span[starts-with(@id, "DataGrid")]/a[@href]'))
    hrefs.click()
    
    await alertHandler()
    await fillQuestion() // if SAVEBTB is clicked
    await alertHandler()

   } 
   finally {
//     await driver.quit();
   }
})();