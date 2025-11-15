// fetch.js
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const url = "https://www.dainikamadershomoy.com/category/all/opinion";

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  // networkidle means "no network request for 500 ms"
  await page.goto(url, { waitUntil: "networkidle" });

  const html = await page.content();

  const dir = "saved";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dir, `opinion-${timestamp}.html`);

  fs.writeFileSync(filePath, html, "utf-8");

  await browser.close();
})();
