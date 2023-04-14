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

await browser.url("http://localhost:3000/signUp");

const username = await browser.$("#usernameSignUp");

const email = await browser.$("#emailSignUp");

const fullname = await browser.$("#fullNameSignUp");

const password = await browser.$("#passwordSignUp");
const passwordConfirm = await browser.$("#confirmPasswordSignUp");
const signUpButton = await browser.$("#signUpButton");

await username.setValue("QuangHuy01");
await browser.pause(1000);

await email.setValue("ngoquanghuyw22@gmail.com");
await browser.pause(1000);

await fullname.setValue("Ngô Quang Huy");
await browser.pause(1000);

await password.setValue("Huyvff@111");
await browser.pause(1000);

await passwordConfirm.setValue("Huyvff@111");
await browser.pause(1000);

await signUpButton.click();
await browser.pause(5000);

await browser.saveScreenshot("./caseSignUp.png");
await browser.pause(1000);
await browser.deleteSession();

// fails if file was not created
fs.existsSync("./caseSignUp.png");
