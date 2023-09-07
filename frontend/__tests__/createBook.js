const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
var should = require("mocha");

describe("Add book and dispay it on the page", function () {
  it("should successfully add a book to the app and check if the bookDetails card is valid", async function () {
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

    // asertion
    let bookTitle = await driver
      .findElement(By.xpath("(//div[@class='book-details']/h4)"))
      .getText();
    let bookAuthor = await driver
      .findElement(By.xpath("(//div[@class='book-details']/p[1])"))
      .getText();
    let bookCopies = await driver
      .findElement(By.xpath("(//div[@class='book-details']/p[2])"))
      .getText();

    assert.strictEqual(bookTitle, "ROMEO & JULIET");
    assert.strictEqual(bookAuthor, "Author: William Shakespeare");
    assert.strictEqual(bookCopies, "Copies: 3");

    // close the browser
    await driver.quit();
  });
});
