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


//Đăng nhập sai username
await browser.url("http://localhost:3000/");
const usernameError = await browser.$("#login-username");
await usernameError.setValue("congthanh28");
await browser.pause(1000);
const passwordError = await browser.$("#login-password");
await passwordError.setValue("28072002Thanh@");
await browser.pause(1000);
const loginButtonError = await browser.$("#login-button");
await loginButtonError.click();
await browser.pause(1000);
await browser.saveScreenshot("./caseLoginFailusername.png");
await browser.pause(1000);

//Load lại trang
await browser.refresh();

//Đăng nhập sai password
await browser.pause(1000);
const usernameError1 = await browser.$("#login-username");
await usernameError1.setValue("congthanh27");
await browser.pause(1000);
const passwordError1 = await browser.$("#login-password");
await passwordError1.setValue("28072002Thanh@1");
await browser.pause(1000);
const showPassword = await browser.$("#login-password-icon");
await showPassword.click();
await browser.pause(1000);
const loginButtonError1 = await browser.$("#login-button");
await loginButtonError1.click();
await browser.pause(1000);
await browser.saveScreenshot("./caseLoginFailpassword.png");
await browser.deleteSession();


// fails if file was not created
fs.existsSync("./caseLogin.png");


