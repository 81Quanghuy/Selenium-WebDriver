import fs from "node:fs";
import { remote } from "webdriverio";
import path from "node:path";
const browser = await remote({
  capabilities: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: process.env.CI ? ["headless", "disable-gpu"] : [],
    },
  },
});
// tạo biến chứa id của các element
const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");
const MATCH_NAME = "#" + ":r8:".replace(/\:/g, "\\:");
const TIME = "#" + ":r9:".replace(/\:/g, "\\:");
const CHANNEL_NAME = "#" + ":ra:".replace(/\:/g, "\\:");
const IP = "#" + ":rb:".replace(/\:/g, "\\:");
const PORT = "#" + ":rc:".replace(/\:/g, "\\:");

const ADD_LEAGUENAME = await browser.$("button[type=button]");
const SAVE_BTN = await browser.$("button[type=submit]");
// kiểm tra đăng nhập
const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
if (!CHECK_LOGIN) {
  await browser.url("http://localhost:3000/login");
  await browser.$("#login-username").setValue("huy");
  await browser.$("#login-password").setValue("Huyvff@111");
  await browser.$("#login-button").click();
  await browser.pause(3000);
}

// thực hiện các bước test
ADD_LEAGUENAME.click();
await browser.pause(3000);
await browser.$(LEAGUE_NAME).setValue("V League");
await browser.pause(3000);
await browser.$(MATCH_NAME).setValue("HAGL vs SHB");
await browser.pause(3000);
await browser.$(TIME).setValue("");
await browser.$(TIME).setValue("04/10/2023 12:31 pm");
await browser.pause(3000);
await browser.$(CHANNEL_NAME).setValue("VTV");
await browser.pause(2000);
await browser.$(IP).setValue("127.0.0.1");
await browser.pause(1000);
await browser.$(PORT).setValue("3000");
await browser.pause(1000);
SAVE_BTN.click();
await browser.pause(3000);
await browser.saveScreenshot("./caseAddMatch.png");
await browser.deleteSession();
