const { Builder, By, Key } = require("selenium-webdriver");

async function createBook() {
  // launch the browser
  let driver = await new Builder().forBrowser("firefox").build();

  // navigate to the app location
  await driver.get("http://localhost:3000/");

  // add a book
  await driver
    .findElement(By.id("book-title-field"))
    .sendKeys("Romeo & Juliet");
  await driver
    .findElement(By.id("book-author-field"))
    .sendKeys("William Shakespeare");
  await driver
    .findElement(By.id("book-copies-field"))
    .sendKeys("3", Key.RETURN);

  // close the browser
  await driver.quit();
}
createBook();
