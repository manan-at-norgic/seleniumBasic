const { Builder, By, Key, util, Browser } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");

suite(
  async () => {
    describe("first suite", async () => {
      it("first test suite", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          //   await driver.manage().setTimeouts({ implicit: 10000 });
          await driver.get("http://google.com");
          let inputField = await driver.findElement(By.name("q"));

          await inputField.sendKeys("selenium", Key.ENTER);

          await driver
            .findElement(
              By.xpath(
                "//div/cite[contains(text(),'https://www.selenium.dev')][1]"
              )
            )
            .click();
        } finally {
          driver.close();
        }
      });
    });
  },
  { browsers: [Browser.CHROME, Browser.FIREFOX] }
);

// (async () => {
//   let driver = await new Builder().forBrowser("chrome").build();

//   describe("first suite", async () => {
//     it("first test suite", async () => {
//       try {
//         await driver.get("http://google.com");
//         let inputField = await driver.findElement(By.name("q"));

//         await inputField.sendKeys("selenium", Key.ENTER);

//         await driver
//           .findElement(
//             By.xpath(
//               "//div/cite[contains(text(),'https://www.selenium.dev')][1]"
//             )
//           )
//           .click();
//       } finally {
//         driver.close();
//       }
//     });
//   });

//   //   await inputField.click();
//   //   await inputField.sendKeys("Selenium");
// })();
