const { chromium } = require("playwright-extra");

async function registerUser(companyName, companyEmail, password) {
  const browser = await chromium.launch({ headless: true });
//   const browser = await chromium.launch({ headless: false });
  browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
  });
  const page = await browser.newPage();

  //   try {

  await page.goto(
    "https://start.insio.cz/cs?skipRecaptcha=skip-recaptcha-secret-token"
  );

  await page.fill('input[name="companyName"]', companyName);
  // await page.waitForTimeout(200);
  await page.fill('input[name="email"]', companyEmail);
  // await page.waitForTimeout(200);
  await page.fill('input[name="password"]', password);
  // await page.waitForTimeout(200);

  await page.click('button[role="checkbox"]');
  await page.waitForTimeout(200);


  await page.hover('button[type="submit"]'); // Hover over the button
  await page.mouse.move(50, 50, { steps: 30 }); // Simulate realistic mouse movement
  await page.click('button[type="submit"]');

  console.log('Clicked on submit')

  await page.waitForURL(/https:\/\/.*\.insio\.cz\/$/, {
    waitUntil: "load",
    timeout: 90000*10,
  });
  console.log("Navigated to final page:", page.url());

  const frames = page.frames();
  let portalFrame = null;

  for (const frame of frames) {
    console.log("Frame URL:", frame.url());
    if (frame.url().includes(".insio.cz")) {
      portalFrame = frame;
      break;
    }
  }

  if (portalFrame) {
    console.log("working completed");
  } else {
    throw new Error("coudnt find iframe element");
  }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //   } finally {
  await browser.close();
  //   }
}

module.exports = { registerUser };
