const browserObject = require("../../utils/browser/browser");
const { sleep,processSheets } = require("../../utils/func");
const {isCategoryPresent, isItemPresent,addItem,addCategory} = require("./module")

const grubhub = async () => {
  const sheetsData = await processSheets();
  const LOGIN_URL = "https://restaurant.grubhub.com/login";
  const MENU_URL = "https://restaurant.grubhub.com/menu";
  const LOGIN_EMAIL = "cgmenuedit140";
  const LOGIN_PASS = "Grubhub123!";
  const SELECTED_RESTAURANT = "Corner Grocer";

  //selectors
  const EMAIL_INPUT_SELECTOR = ".authentication-username input";
  const PASSWORD_INPUT_SELECTOR = ".authentication-password input";
  const LOGIN_BUTTON_SELECTOR = ".login__form button";
  const SELECT_RESTAURANT_SELECTOR = ".gfr-single-dropdown";
  const RESTAURANT_OPTIONS_SELECTOR = ".gfr-dropdown-option span";
  const SELECTED_RESTAURANT_XPATH = `//div[contains(@class,"gfr-dropdown-option")]/span[text()="Corner Grocer"]`

  try {
    let browserInstance = browserObject.startBrowser();
    let browser = await browserInstance;
    let page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    console.log(`Navigating to ${LOGIN_URL}...`);

    await page.goto(LOGIN_URL);

    await page.waitForSelector(EMAIL_INPUT_SELECTOR);
    await page.screenshot({
      path: './s1.png',
      fullPage: true,
    })
    await page.type(EMAIL_INPUT_SELECTOR, LOGIN_EMAIL);
    await page.type(PASSWORD_INPUT_SELECTOR, LOGIN_PASS);

    await page.waitForTimeout(2000)

    await page.click(LOGIN_BUTTON_SELECTOR);
    await page.waitForNavigation();

    await page.goto(MENU_URL);
    await page.waitForNavigation();

    await page.screenshot({
      path: './s2.png',
      fullPage: true,
    });

 

    await page.click(SELECT_RESTAURANT_SELECTOR);
    await page.waitForXPath(SELECTED_RESTAURANT_XPATH)

    await (await page.$x(SELECTED_RESTAURANT_XPATH))[0].click()

    // const restaurantOptions = await page.$$(RESTAURANT_OPTIONS_SELECTOR);

    // for (const option of restaurantOptions) {
    //   const restaurantName = await (
    //     await option.getProperty("textContent")
    //   ).jsonValue();

    //   console.log(restaurantName);

    //   if (restaurantName === SELECTED_RESTAURANT) {
    //     await option.click();
    //     break;
    //   }
    // }

    await page.waitForNavigation({waitUntil:'networkidle2'});
    
    await page.screenshot({
      path: './s3.png',
      fullPage: true,
    })

    const category = 'Beverages #tipstat-testing-1'

   const categoryHandle1 = await isCategoryPresent(page,category)

   console.log(categoryHandle1)

   if (categoryHandle1) await categoryHandle1.click();
   await page.waitForXPath(`//h2[text()="${category}"]`)

   await addItem(page)



    //testing paramas

  
    // const categoryHandle2 = await isCategoryPresent(page,'Beer - Variety of 9, 12, 15, 18 & 30 Packs (Must be 21 to Purchase)')
    // const categoryHandle3 = await isCategoryPresent(page,'Beverages')
   
  //  console.log(await isCategoryPresent(page,'Ready to Eat Meals'))
  //  console.log(await isCategoryPresent(page,'Candies, Gummies, and Fruit Snacks'))
  //  console.log(await isCategoryPresent(page,'Newly Added Products!!'))
  //  console.log(await isCategoryPresent(page,'Nuts and Dried Fruits/Seeds'))
  //  console.log(await isCategoryPresent(page,'Beer - Variety of 9, 12, 15, 18 & 30 Packs (Must be 21 to Purchase)'))
  //  console.log(await isCategoryPresent(page,'Beverages'))

  //  console.log(await isItemPresent(page,categoryHandle1,'Ready to Eat Meals','Annie Chuns Soup Bowl'))
  //  console.log(await isItemPresent(page,categoryHandle1,'Ready to Eat Meals','Miracle Noodles'))

  //  console.log(await isItemPresent(page,categoryHandle2,'Beer - Variety of 9, 12, 15, 18 & 30 Packs (Must be 21 to Purchase)','Brooklyn Variety Pack (12 Oz - 12 Pk)'))
  //  console.log(await isItemPresent(page,categoryHandle2,'Beer - Variety of 9, 12, 15, 18 & 30 Packs (Must be 21 to Purchase)','Bud Light - (12 Oz - 12 Pk)'))
  //  console.log(await isItemPresent(page,categoryHandle2,'Beer - Variety of 9, 12, 15, 18 & 30 Packs (Must be 21 to Purchase)','Bud Light - (12 Oz - 12 k)'))

  //  console.log(await isItemPresent(page,categoryHandle3,'Beverages','Energy Drink'))

    // await addCategory(page,'Beverages #tipstat-testing-1')



    return;

    //$x("//div[@class='gfr-dropdown__options']/div/span[text()='Corner Grocer']")

    await page.close();
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
};

module.exports = grubhub;
