const { assert } = require("chai");
const { Builder, By, Browser } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

suite(
  async () => {
    describe("Test suite", async () => {
      before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
      });
      after(async () => {
        await delay(5000);
        await driver.quit();
      });
      describe("1. add remove elements", async () => {
        it("", async () => {
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
      });
      describe("2. Basic auth with alert", async () => {
        it("", async () => {
          await driver.navigate().back();
          await delay(2000);
          //here to handle the basic auth popup we can send parameters in url like
          // http://username:password@domain.com
          await driver
            .navigate()
            .to("http://admin:admin@the-internet.herokuapp.com/basic_auth");
        });
      });
      describe("3. broken images", async () => {
        it("", async () => {
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
            const isLoaded =
              (await element.getAttribute("naturalWidth")) !== "0";
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

      describe("4. challenging DOM", async () => {
        it("navigation/load page", async () => {
          await delay(2000);
          await driver.navigate().back();
        });
        it("check title of the home page", async () => {
          // let title = await driver.getTitle();
          // assert.equal("The Internet", title);
          await driver.getTitle().then((title) => {
            assert.equal("The Internet", title);
          });
        });
        it("verify Header of Challenging DOM", async () => {
          await delay(2000);
          await driver
            .findElement(By.xpath("//ul/li/a[@href='/challenging_dom']"))
            .click();

          let header = await driver.findElement(
            By.xpath("//div[@class='example']/h3")
          );
          let text = await header.getText();
          assert.equal("Challenging DOM", text);
        });

        // ----------------------------------------------------------------
        // minimize code by using a common function by passing driver and xpath parameters
        it("verify foo button functionality", async () => {
          await delay(2000);
          let fooLink = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[1]")
          );
          let fooId = await fooLink.getAttribute("id");
          await fooLink.click();
          let fooLinkAfter = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[1]")
          );
          let fooIdAfter = await fooLinkAfter.getAttribute("id");
          assert.notEqual(fooId, fooIdAfter);
          // console.warn(fooId, fooIdAfter);
        });
        it("verify bar/alert button functionality", async () => {
          await delay(2000);
          let fooLink = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[2]")
          );
          let fooId = await fooLink.getAttribute("id");
          await fooLink.click();
          let fooLinkAfter = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[2]")
          );
          let fooIdAfter = await fooLinkAfter.getAttribute("id");
          assert.notEqual(fooId, fooIdAfter);
          // console.warn(fooId, fooIdAfter);
        });
        it("verify qux/success button functionality", async () => {
          await delay(2000);
          let fooLink = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[3]")
          );
          let fooId = await fooLink.getAttribute("id");
          await fooLink.click();
          let fooLinkAfter = await driver.findElement(
            By.xpath("//div[@class='large-2 columns']/a[3]")
          );
          let fooIdAfter = await fooLinkAfter.getAttribute("id");
          assert.notEqual(fooId, fooIdAfter);
          // console.warn(fooId, fooIdAfter);
        });
        //
        it("check headers of the table", async () => {
          // 1 find first header of table with xpath
          // 2 get text of that header element
          // 3 verfiy header element with static/dynamic test
          let headerElem = [
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[1]",
              text: "Lorem",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[2]",
              text: "Ipsum",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[3]",
              text: "Dolor",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[4]",
              text: "Sit",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[5]",
              text: "Amet",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[6]",
              text: "Diceret",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/thead/tr/th[7]",
              text: "Action",
            },
          ];
          const verifyHeader = async (path, text) => {
            assert.equal(
              await driver.findElement(By.xpath(`${path}`)).getText(),
              `${text}`
            );
          };

          for (const elem of headerElem) {
            await verifyHeader(elem.xpath, elem.text);
          }
        });
        it("check the table coloumn 1", async () => {
          // 1 find first header of table with xpath
          // 2 get text of that header element
          // 3 verfiy header element with static/dynamic test
          let tableColoumn = [
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[1]",
              text: "Iuvaret0",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[2]",
              text: "Apeirian0",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[3]",
              text: "Adipisci0",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[4]",
              text: "Definiebas0",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[5]",
              text: "Consequuntur0",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[6]",
              text: "Phaedrum0",
            },
            // {
            //   xpath: "//div[@class='large-10 columns']/table/tbody/tr[1]/td[7]",
            //   text: "Action",
            // },
          ];
          const verfyColoumn = async (path, text) => {
            assert.equal(
              await driver.findElement(By.xpath(`${path}`)).getText(),
              `${text}`
            );
          };

          for (const elem of tableColoumn) {
            await verfyColoumn(elem.xpath, elem.text);
          }
        });
        it("check the table coloumn 2", async () => {
          // 1 find first header of table with xpath
          // 2 get text of that header element
          // 3 verfiy header element with static/dynamic test
          let tableColoumn2 = [
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[1]",
              text: "Iuvaret1",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[2]",
              text: "Apeirian1",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[3]",
              text: "Adipisci1",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[4]",
              text: "Definiebas1",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[5]",
              text: "Consequuntur1",
            },
            {
              xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[6]",
              text: "Phaedrum1",
            },
            // {
            //   xpath: "//div[@class='large-10 columns']/table/tbody/tr[2]/td[7]",
            //   text: "Action",
            // },
          ];
          const verifyColoumn2 = async (path, text) => {
            assert.equal(
              await driver.findElement(By.xpath(`${path}`)).getText(),
              `${text}`
            );
          };

          for (const elem of tableColoumn2) {
            await verifyColoumn2(elem.xpath, elem.text);
          }
        });
      });
    });
  },
  { browsers: [Browser.CHROME, Browser.FIREFOX] }
);
