import fs from "node:fs";
import { remote } from "webdriverio";

const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});

await browser.url("http://localhost:3000/");

const username = await browser.$("#login-username");
await username.setValue("82");
await browser.pause(1000);
const password = await browser.$("#login-password");
await password.setValue("Huyvff@111");
await browser.pause(1000);
const loginButton = await browser.$("#login-button");
await loginButton.click();
await browser.pause(1000);
await browser.saveScreenshot("./caseLoginFailuserName.png");
await browser.deleteSession();

// fails if file was not created
fs.existsSync("./caseLogin.png");
