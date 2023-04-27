const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

(async function main() {

    

    //gmail account
    const account=''
    
    //gmail password
    const password=''

    // const userName='USER'
    const options = new chrome.Options();
    // options.addArguments(`user-data-dir=C:\\Users\\${userName}\\AppData\Local\\Google\\Chrome\\User Data`)
    
    let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {

    await driver.get('https://accounts.google.com/')
    await driver.findElement(By.name('identifier')).sendKeys(account)
    driver.findElement(By.name('identifier')).sendKeys(Key.ENTER)
    
    await driver.wait(until.elementsLocated(By.name('Passwd')))
    await driver.wait(until.elementIsVisible(driver.findElement(By.name('Passwd'))))

    await driver.findElement(By.name('Passwd')).sendKeys(password)
    driver.findElement(By.name('Passwd')).sendKeys(Key.ENTER)

    await driver.wait(until.urlContains('myaccount.google.com'))
    
    await driver.get('https://newacademic.tmu.edu.tw/')
    await driver.wait(until.elementsLocated(By.id('LGOIN_BTN1')))
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('LGOIN_BTN1'))))
    await driver.findElement(By.id('LGOIN_BTN1')).click()


    await driver.wait(until.elementsLocated(By.name('mainFrame')))
    //go to mainFrame
    await driver.switchTo().frame(driver.findElement(By.name('mainFrame')));

    let elements=await driver.findElements(By.tagName('a'))
    elements[9].click()

    await driver.wait(until.elementsLocated(By.id('PC_PageSize')))
    await driver.findElement(By.id('PC_PageSize')).sendKeys(1000)
    driver.findElement(By.id('PC_PageSize')).sendKeys(Key.ENTER);

    await driver.wait(until.elementsLocated(By.className('blockUI')))
    let block= driver.findElement(By.className('blockUI'))
    await driver.wait(until.elementIsNotVisible(block))

    await driver.wait(until.elementsLocated(By.name('mainFrame')))
    //go to mainFrame
    await driver.switchTo().frame(driver.findElement(By.name('mainFrame')));


    let hrefs=await driver.findElements(By.tagName('a'))
    console.log(hrefs.length)
    hrefs[13].click()
    console.log(123)

    await driver.wait(until.alertIsPresent())
    let alert = await driver.switchTo().alert();

    await alert.accept();


    await driver.switchTo().frame(driver.findElement(By.name('viewFrame')));

    let inputs=driver.findElements(By.tagName('input'))
    for(let i of inputs) {
        i.checked = true;
    }
    driver.findElement(By.id("SAVE_BTN2")).click()
    //go back
    await driver.switchTo().defaultContent();

    
   } 
   finally {
//     await driver.quit();
   }
})();