const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function startBrowser() {
  let browser;
  const options = {
    width:1920,
    height: 1080
  }
  try {
 
    console.log("Opening the browser......");

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-setuid-sandbox",
        '--no-sandbox',
        // "--start-maximized",
        "--ignore-certificate-errors",
        "--ignore-certificate-errors-spki-list",
        `--window-size=${options.width},${options.height}`
      ],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
