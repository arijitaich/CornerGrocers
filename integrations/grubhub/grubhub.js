const browserObject = require("../../utils/browser/browser");

const grubhub = async () => {
  const LOGIN_URL = "https://restaurant.grubhub.com/login";
  const MENU_URL = "https://restaurant.grubhub.com/menu";
  const LOGIN_EMAIL = "cgmenuedit140";
  const LOGIN_PASS = "Grubhub123!";

  //selectors
  const EMAIL_INPUT_SELECTOR = ".authentication-username input";
  const PASSWORD_INPUT_SELECTOR = ".authentication-password input";
  const LOGIN_BUTTON_SELECTOR = ".login__form button";

  try {
    let browserInstance = browserObject.startBrowser();
    let browser = await browserInstance;
    let page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    console.log(`Navigating to ${LOGIN_URL}...`);

    await page.goto(LOGIN_URL);

    await page.waitForSelector(EMAIL_INPUT_SELECTOR);
    await page.type(EMAIL_INPUT_SELECTOR, LOGIN_EMAIL);
    await page.type(PASSWORD_INPUT_SELECTOR, LOGIN_PASS);

    await page.click(LOGIN_BUTTON_SELECTOR);
    await page.waitForNavigation();

    await page.goto(MENU_URL);

    return;

    await page.close();
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
};

module.exports = grubhub;
