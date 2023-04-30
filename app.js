const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
const debuggingMode = false;
// Open debugging browser in terminal
// chrome.exe  --remote-debugging-port=9222 --user-data-dir="C:\\Users\\zithr\\Desktop\\autofill\\browser"

(async function main() {

    

    //gmail account
    const account=''
    //gmail password
    const password=''

    // const userName='USER'
    const options = new chrome.Options();
    // options.addArguments(`user-data-dir=C:\\Users\\${userName}\\AppData\Local\\Google\\Chrome\\User Data`)
    
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
    await driver.switchTo().frame(driver.findElement(By.name('mainFrame')));
    
    
    // xapth: find <span id = 'DataGrid*'>
    let elements = await driver.findElement(By.xpath('//span[starts-with(@id, "DataGrid")]'))
    await elements.click()

    
    await driver.wait(until.elementsLocated(By.id('PC_PageSize')))
    await driver.findElement(By.id('PC_PageSize')).sendKeys(1000)
    driver.findElement(By.id('PC_PageSize')).sendKeys(Key.ENTER)
    
    
    await driver.wait(until.elementsLocated(By.xpath('//span[starts-with(@id, "DataGrid")]/a[@href]')))
    let hrefs = await driver.findElement(By.xpath('//span[starts-with(@id, "DataGrid")]/a[@href]'))
    hrefs.click()

    // Alert function is OK
    await driver.wait(until.alertIsPresent())
    let alert = await driver.switchTo().alert();
    await alert.accept();
    
    
    await driver.wait(until.elementsLocated(By.name('viewFrame')))
    //go to mainFrame
    await driver.switchTo().frame(driver.findElement(By.name('viewFrame')));
    
    /*
    await driver.wait(until.elementsLocated(By.xpath('//input[@type = radio]')))
    let input = driver.findElement(By.xpath('//input[@type = radio]'))
    input.click()
    */

    // await driver.wait(until.elementsLocated(By.tagName('a')))
    // let hrefs = await driver.findElements(By.tagName('a'))
    // hrefs[13].click()
    // await driver.executeScript("document.getElementsByTagName('a')[19].click();")

    /*



    
    driver.findElement(By.id("SAVE_BTN2")).click()
    //go back
    await driver.switchTo().defaultContent();
    */
    
   } 
   finally {
//     await driver.quit();
   }
})();