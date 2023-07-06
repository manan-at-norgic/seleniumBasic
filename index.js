const { Builder, By, Browser } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

suite(
  async () => {
    describe("first suite", async () => {
      before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
      });
      after(async () => {
        await delay(5000);
        await driver.quit();
      });

      it("1. add remove elements", async () => {
        try {
          await driver.navigate().to("http://the-internet.herokuapp.com/");

          await driver
            .findElement(By.xpath("//ul/li/a[@href='/add_remove_elements/']"))
            .click();

          for (let i = 0; i < 10; i++) {
            await driver
              .findElement(By.xpath("//div[@class='example']/button"))
              .click();
          }

          for (let i = 0; i < 10; i++) {
            await driver
              .findElement(By.xpath("//div[@id='elements']/button[1]"))
              .click();
          }
        } catch (e) {
          console.log(e, "error from catch block");
        }
      });
      it("2. Basic auth with alert", async () => {
        await driver.navigate().back();
        await delay(2000);
        //here to handle the basic auth popup we can send parameters in url like
        // http://username:password@domain.com
        await driver
          .navigate()
          .to("http://admin:admin@the-internet.herokuapp.com/basic_auth");
      });
      it("3. broken images", async () => {
        // Navigate to the webpage
        await delay(2000);
        await driver.navigate().back();
        await delay(3000);
        await driver
          .findElement(By.xpath("//ul/li/a[@href='/broken_images']"))
          .click();

        // Find all the img elements
        const elements = await driver.findElements(By.css("img"));
        let totaleImages = 0;
        let okImg = 0;
        let broken = 0;
        // Check if each image is loaded successfully
        for (const element of elements) {
          const src = await element.getAttribute("src");
          const isLoaded = (await element.getAttribute("naturalWidth")) !== "0";
          totaleImages++;

          // Assert that the image is loaded successfully
          // expect(isLoaded, `Broken image detected: ${src}`).to.be.true;
          if (isLoaded) {
            okImg++;
          } else {
            broken++;
          }
          // console.log(`// ${isLoaded}`);
        }

        console.log(
          broken,
          `Broken image detected and ok Img count is ${okImg} and total image cont is ${totaleImages}`
        );
      });
    });
  },
  { browsers: [Browser.CHROME, Browser.FIREFOX] }
);
