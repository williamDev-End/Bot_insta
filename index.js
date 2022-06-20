const express = require('express');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1920,1080',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({
    height: 1080,
    width: 1920,
  });
  await page.goto('https://instagram.com');
  await page.click('body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.HoLwm');
  await page.waitForSelector('input');
  await page.type('[name=username]', process.env.INSTAGRAM_USERNAME);
  await page.type('[name=password]', process.env.INSTAGRAM_PASSWORD);
  await page.evaluate(() => {
    document.querySelector('#loginForm > div > div:nth-child(3) > button').click();
  });
  await page.waitForSelector('input');
  await page.evaluate(() => {
    console.log('evaluate', document.querySelector('.cmbtv > button'));
    // document.querySelector('.cmbtv > button').click();
  });
//   await browser.close();
})();

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
