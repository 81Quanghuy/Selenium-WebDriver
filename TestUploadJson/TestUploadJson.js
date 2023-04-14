// tạo biến chứa id của các element
const LEAGUE_NAME = "#" + ":r7:".replace(/\:/g, "\\:");
const MATCH_NAME = "#" + ":r8:".replace(/\:/g, "\\:");
const TIME = "#" + ":r9:".replace(/\:/g, "\\:");
const CHANNEL_NAME = "#" + ":ra:".replace(/\:/g, "\\:");
const IP = "#" + ":rb:".replace(/\:/g, "\\:");
const PORT = "#" + ":rc:".replace(/\:/g, "\\:");
// thêm trận đấu
async function createMatch(browser) {
  const ADD_LEAGUENAME = await browser.$("button[type=button]");
  const SAVE_BTN = await browser.$("button[type=submit]");
  ADD_LEAGUENAME.click();
  await browser.pause(1000);
  await browser.$(LEAGUE_NAME).setValue("V League");
  await browser.pause(2000);
  await browser.$(MATCH_NAME).setValue("HAGL vs SHB");
  await browser.pause(2000);
  await browser.$(TIME).setValue("");
  await browser.$(TIME).setValue("04/10/2023 12:31 pm");
  await browser.pause(2000);
  await browser.$(CHANNEL_NAME).setValue("VTV");
  await browser.pause(2000);
  await browser.$(IP).setValue("127.0.0.1");
  await browser.pause(1000);
  await browser.$(PORT).setValue("3000");
  await browser.pause(1000);
  SAVE_BTN.click();
  await browser.pause(3000);
  await browser.saveScreenshot("./caseAddMatch.png");
  //await browser.deleteSession();
}
async function uploadJson(browser) {
  await browser.$$("td")[6].$("button").click();
  await browser.pause(1000);
  await browser
    .$('span[title="types: JSON"]')
    .setValue("Uploaded Successfully!.");
  await browser.pause(1000);
  await browser.$("input[type=file]").setValue("");
  await browser.pause(1000);
  await browser
    .$$(
      ".MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-sghohy-MuiButtonBase-root-MuiButton-root"
    )[1]
    .click();
  await browser.pause(1000);
  await browser.saveScreenshot("./caseUploadJson.png");
  await browser.deleteSession();
}

import { startBrowser } from "../Browser/browser.js";
import { testLogin } from "../TestCaseLogin/testLogin.js";

async function startBr() {
  const browser = await startBrowser();
  const CHECK_LOGIN = await browser.$(LEAGUE_NAME)?.isExisting();
  if (!CHECK_LOGIN) {
    testLogin(browser).then(() => {
      createMatch(browser).then(() => {
        uploadJson(browser).then(() => {});
      });
    });
  }
}
startBr();
