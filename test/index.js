const { assert, expect } = require("chai");
const { Builder, By, Browser, Actions, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const chai = require("chai");
const http = require("http");
const chaiAsPromised = require("chai-as-promised");
const { default: axios } = require("axios");
const { Select } = require("selenium-webdriver");
const { del } = require("selenium-webdriver/http");

// chai.use(chaiAsPromised);
// const expect = chai.expect;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

suite(
  async () => {
    describe("Test suite", async () => {
      before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
      });
      after(async () => {
        await delay(2000);
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
          // await delay(2000);
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
          // await delay(2000);
          await driver.navigate().back();
          // await delay(3000);
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
            {
              isLoaded ? okImg++ : broken++;
            }
            // if (isLoaded) {
            //   console.log(isLoaded, "isloaded successfully");
            //   okImg++;
            // } else {
            //   broken++;
            // }
            // console.log(`// ${isLoaded}`);
          }

          assert.equal(broken, 2);

          // console.log(
          //   broken,
          //   `Broken image detected and ok Img count is ${okImg} and total image cont is ${totaleImages}`
          // );
        });
      });

      describe("4. challenging DOM", async () => {
        it("navigation/load page", async () => {
          // await delay(2000);
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
          // await delay(2000);
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
          // await delay(2000);
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
          // await delay(2000);
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
          // await delay(2000);
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
        it("check edit button", async () => {
          // await driver.navigate().back();
          let urlBefore = await driver.getCurrentUrl();
          await driver
            .findElement(
              By.xpath(
                "//div[@class='large-10 columns']/table/tbody/tr[2]/td[7]/a[@href='#edit']"
              )
            )
            .click();

          let urlAfter = await driver.getCurrentUrl();
          expect(urlBefore).to.not.equal(`${urlAfter}`);

          // await delay(2000);
        });
        it("check delete button", async () => {
          await driver.navigate().back();
          let urlBefore = await driver.getCurrentUrl();
          await driver
            .findElement(
              By.xpath(
                "//div[@class='large-10 columns']/table/tbody/tr[2]/td[7]/a[@href='#delete']"
              )
            )
            .click();

          let urlAfter = await driver.getCurrentUrl();
          expect(urlBefore).to.not.equal(`${urlAfter}`);

          // await delay(2000);
        });
      });
      describe("5. Checkboxes", async () => {
        it("navigate to check box page", async () => {
          // await delay(2000);
          await driver.navigate().to("http://the-internet.herokuapp.com/");
          await driver
            .findElement(By.xpath("//ul/li/a[@href='/checkboxes']"))
            .click();
        });
        it("verify header of checkbox page", async () => {
          // await delay(2000);
          let header = await driver.findElement(
            By.xpath("//div[@id='content']/div/h3")
          );
          assert.equal(await header.getText(), `Checkboxes`);
        });
        it("verify checkboxes", async () => {
          // await delay(2000);
          let checkbox1 = await driver.findElement(
            By.xpath("//div[@id='content']/div/form/input[1]")
          );
          await checkbox1.click();
          delay(2000);
          let checkbox2 = await driver.findElement(
            By.xpath("//div[@id='content']/div/form/input[2]")
          );
          await checkbox2.click();
          delay(2000);
          await checkbox1.click();
          delay(2000);
          await checkbox2.click();
          delay(2000);
        });
      });
      describe("6. Context Menu", async () => {
        it("navigation", async () => {
          // await delay(2000);
          await driver.navigate().back();
          await driver
            .findElement(By.xpath("//ul/li/a[@href='/context_menu']"))
            .click();
        });
        it("verify header of Context Menu", async () => {
          // await delay(2000);
          let header = await driver.findElement(
            By.xpath("//div[@id='content']/div/h3")
          );
          assert.equal(await header.getText(), `Context Menu`);
        });
        it("verify right click funtionality", async () => {
          // Create an instance of Actions
          // const actions = new Actions(driver);
          let element = await driver.findElement(
            By.xpath("//div[@id='content']/div/div")
          );

          // await actions.contextClick(element).perform();
          await driver.actions().contextClick(element).perform();
        });
        it("verify Alert message", async () => {
          const alert = await driver.switchTo().alert();
          const alertMessage = await alert.getText();
          console.log(alertMessage);
          assert.equal(alertMessage, "You selected a context menu");
        });
        it("Accept alert", async () => {
          const alert = await driver.switchTo().alert();
          await alert.accept();
        });
      });
      describe("7. Disappearing elements", async () => {
        it("navigation", async () => {
          // await delay(2000);
          await driver.navigate().back();
          await driver
            .findElement(By.xpath("//ul/li/a[@href='/disappearing_elements']"))
            .click();
        });
        it("check 404 pages", async () => {
          // await delay(2000);
          const notFoundPageDetection = async (e) => {
            // await delay(2000);
            await driver
              .findElement(By.xpath(`//div[@id='content']/div/ul/li[${e}]`))
              .click();

            const url = await driver.getCurrentUrl();
            // assert(await axios.get(url), "404");

            // Make an HTTP GET request
            const protocol = http;
            protocol.get(url, (response) => {
              // Get the status code from the response
              const statusCode = response.statusCode;

              // console.log("Status code:", statusCode);
              assert.equal(statusCode, "404");
            });

            await driver.navigate().back();
          };

          for (let i = 2; i < 5; i++) {
            // console.log(i);
            await notFoundPageDetection(i);
          }
        });
        // it("check contact Us page", async () => {
        //   // await delay(2000);
        //   await driver.navigate().back();
        //   await driver
        //     .findElement(By.xpath("//div[@id='content']/div/ul/li[3]"))
        //     .click();

        //   const url = await driver.getCurrentUrl();
        //   // assert(await axios.get(url), "404");

        //   // Make an HTTP GET request
        //   const protocol = http;
        //   protocol.get(url, (response) => {
        //     // Get the status code from the response
        //     const statusCode = response.statusCode;

        //     console.log("Status code:", statusCode);
        //     assert.equal(statusCode, "404");
        //   });
        // });
        // it("check Portfolio page", async () => {
        //   // await delay(2000);
        //   await driver.navigate().back();
        //   await driver
        //     .findElement(By.xpath("//div[@id='content']/div/ul/li[4]"))
        //     .click();

        //   const url = await driver.getCurrentUrl();
        //   // assert(await axios.get(url), "404");

        //   // Make an HTTP GET request
        //   const protocol = http;
        //   protocol.get(url, (response) => {
        //     // Get the status code from the response
        //     const statusCode = response.statusCode;

        //     console.log("Status code:", statusCode);
        //     assert.equal(statusCode, "404");
        //   });
        // });
        // it("check Gallery page", async () => {
        //   // await delay(2000);
        //   await driver.navigate().back();
        //   await driver
        //     .findElement(By.xpath("//div[@id='content']/div/ul/li[5]"))
        //     .click();

        //   const url = await driver.getCurrentUrl();
        //   // assert(await axios.get(url), "404");

        //   // Make an HTTP GET request
        //   const protocol = http;
        //   protocol.get(url, (response) => {
        //     // Get the status code from the response
        //     const statusCode = response.statusCode;

        //     console.log("Status code:", statusCode);
        //     assert.equal(statusCode, "404");
        //   });
        // });
        it("check Home page navigation", async () => {
          const element = await driver.wait(
            until.elementLocated(
              By.xpath("//div[@id='content']/div/ul/li[1]/a")
            )
          );

          await element.click();
          const url = await driver.getCurrentUrl();

          // Make an HTTP GET request
          http.get(url, (response) => {
            // Get the status code from the response
            const statusCode = response.statusCode;

            // console.log("Status code:", statusCode);
            assert.equal(statusCode, "200");
          });
        });
      });
      describe("8. Drag and drop", async () => {
        it("navigation", async () => {
          await driver
            .navigate()
            .to("https://www.selenium.dev/selenium/web/mouse_interaction.html");
        });
        // it("verify header of Drag and Drop", async () => {
        //   // await delay(2000);
        //   let header = await driver.findElement(
        //     By.xpath("//div[@id='content']/div/h3")
        //   );
        //   assert.equal(await header.getText(), `Drag and Drop`);
        // });
        it("drag and drop element a to b", async () => {
          // await delay(2000);
          // html5 drag able not supported in selenium
          let draggable = await driver.findElement(By.id("draggable"));
          let dropable = await driver.findElement(By.id("droppable"));

          const actions = await driver.actions({ async: true });
          await actions.dragAndDrop(draggable, dropable).perform();
        });
      });
      describe("9. Drop Down List", async () => {
        it("verify drop down menu", async () => {
          await driver.navigate().to("http://the-internet.herokuapp.com/");
          await driver.findElement(By.xpath("//a[@href='/dropdown']")).click();

          let elem = await driver.findElement(By.xpath("//select"));
          // await delay(500);
          // await driver.findElement(By.xpath("//option[2]")).click();

          // Create a new Select instance
          const dropdown = new Select(elem);
          let data = ["Option 1", "Option 2"];
          let selectOption = async (option) => {
            // Select an option by visible text
            await dropdown.selectByVisibleText(`${option}`);
            // await delay(500);
          };

          for (let i = 0; i < 3; i++) {
            for (const element of data) {
              await selectOption(element);
            }
          }
        });
      });
      describe("10. Dynamic content", async () => {
        it("navigation", async () => {
          // await delay(2000);
          await driver.navigate().back();
          await driver
            .findElement(By.xpath("//a[@href='/dynamic_content']"))
            .click();
        });
        it("dynamic content verification", async () => {
          let imgSource = [];
          let data2 = [];
          const storeDynamicData = async (imgPath) => {
            let imgs = await driver.findElements(By.xpath(imgPath));
            let arr = [];
            for (let i = 0; i < imgs.length; i++) {
              let img = imgs[i];
              arr.push({ [i]: await img.getAttribute("src") });
            }
            imgSource.push(arr);

            arr = [];
          };
          const verifyDynamicContent = async (arrayOfObjects) => {
            for (let i = 0; i < arrayOfObjects[0].length; i++) {
              let arr1 = arrayOfObjects[0];
              let arr2 = arrayOfObjects[1];
              assert.equal(arr1.length, arr2.length);
              if (arr1.length === arr2.length) {
                if (arr1[i][i] === arr2[i][i]) {
                  console.log(true);
                } else {
                  console.log(false);
                }
              }
            }
          };

          // 1st iteration to store images src
          await storeDynamicData("//div[@class='example']/div/div/div/div/img");
          await driver.navigate().refresh();

          // 2nd iteration to store images src
          await storeDynamicData("//div[@class='example']/div/div/div/div/img");

          // console.log(
          //   JSON.stringify(imgSource),
          //   "2 sub arrays with 3 image src objects"
          // );
          await verifyDynamicContent(imgSource);
        });
      });
    });
  },
  { browsers: [Browser.CHROME, Browser.FIREFOX] }
);
